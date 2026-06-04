const express = require('express');
const folderController = require('../controllers/folderController');

const router = express.Router();

router.get('/', folderController.getFolders);
router.post('/', folderController.createFolder);
router.patch('/:id', folderController.updateFolder);
router.delete('/:id', folderController.deleteFolder);

module.exports = router;
