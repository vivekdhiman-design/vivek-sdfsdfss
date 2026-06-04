let folders = [
  {
    id: 1,
    name: 'Workspace',
    parentId: null,
    createdAt: new Date().toISOString()
  }
];

let nextId = 2;

function getAllFolders() {
  return folders;
}

function createFolder(name, parentId = null) {
  const folder = {
    id: nextId++,
    name,
    parentId,
    createdAt: new Date().toISOString()
  };

  folders.push(folder);
  return folder;
}

function renameFolder(id, name) {
  const folder = folders.find((item) => item.id === Number(id));

  if (!folder) {
    return null;
  }

  folder.name = name;
  folder.updatedAt = new Date().toISOString();
  return folder;
}

function deleteFolder(id) {
  const folderId = Number(id);
  const exists = folders.some((item) => item.id === folderId);

  if (!exists) {
    return false;
  }

  folders = folders.filter((item) => item.id !== folderId && item.parentId !== folderId);
  return true;
}

module.exports = {
  getAllFolders,
  createFolder,
  renameFolder,
  deleteFolder
};
