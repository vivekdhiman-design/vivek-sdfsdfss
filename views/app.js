const folderTree = document.getElementById('folderTree');
const folderForm = document.getElementById('folderForm');
const folderName = document.getElementById('folderName');

async function fetchFolders() {
  const response = await fetch('/api/folders');
  const result = await response.json();
  renderFolders(result.data || []);
}

function flattenFolders(folders, depth = 0) {
  return folders.flatMap((folder) => [
    { ...folder, depth },
    ...flattenFolders(folder.children || [], depth + 1)
  ]);
}

function renderFolders(folders) {
  const flatFolders = flattenFolders(folders);

  if (!flatFolders.length) {
    folderTree.innerHTML = '<p>No folders yet. Create your first folder.</p>';
    return;
  }

  folderTree.innerHTML = flatFolders
    .map((folder) => `
      <article class="folder-card">
        <div class="folder-icon" style="color: ${folder.color}">📁</div>
        <div class="folder-name">${'&nbsp;'.repeat(folder.depth * 4)}${folder.name}</div>
        <div class="folder-meta">Folder ID: ${folder.id}</div>
        <div class="actions">
          <button onclick="renameFolder(${folder.id}, '${folder.name}')">Rename</button>
          <button class="delete-btn" onclick="deleteFolder(${folder.id})">Delete</button>
        </div>
      </article>
    `)
    .join('');
}

folderForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  await fetch('/api/folders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: folderName.value })
  });

  folderName.value = '';
  fetchFolders();
});

async function renameFolder(id, currentName) {
  const name = prompt('Enter new folder name:', currentName);

  if (!name) {
    return;
  }

  await fetch(`/api/folders/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name })
  });

  fetchFolders();
}

async function deleteFolder(id) {
  await fetch(`/api/folders/${id}`, {
    method: 'DELETE'
  });

  fetchFolders();
}

fetchFolders();
