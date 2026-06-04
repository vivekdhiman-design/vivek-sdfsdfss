const folderService = require('../services/folderService');
const { success, error } = require('../utils/responseHelper');

function getFolders(req, res) {
  return success(res, folderService.getFolderTree());
}

function createFolder(req, res) {
  try {
    const folder = folderService.createFolder(req.body);
    return success(res, folder, 'Folder created successfully', 201);
  } catch (err) {
    return error(res, err.message, 400);
  }
}

function updateFolder(req, res) {
  try {
    const folder = folderService.renameFolder(req.params.id, req.body);

    if (!folder) {
      return error(res, 'Folder not found', 404);
    }

    return success(res, folder, 'Folder updated successfully');
  } catch (err) {
    return error(res, err.message, 400);
  }
}

function deleteFolder(req, res) {
  const deleted = folderService.deleteFolder(req.params.id);

  if (!deleted) {
    return error(res, 'Folder not found', 404);
  }

  return success(res, null, 'Folder deleted successfully');
}

module.exports = {
  getFolders,
  createFolder,
  updateFolder,
  deleteFolder
};
