const Folder = require('../models/folderModel');

function buildFolderTree() {
  const folders = Folder.getAllFolders();
  const map = new Map();
  const roots = [];

  folders.forEach((folder) => {
    map.set(folder.id, { ...folder, children: [] });
  });

  map.forEach((folder) => {
    if (folder.parentId && map.has(folder.parentId)) {
      map.get(folder.parentId).children.push(folder);
    } else {
      roots.push(folder);
    }
  });

  return roots;
}

module.exports = {
  buildFolderTree
};
