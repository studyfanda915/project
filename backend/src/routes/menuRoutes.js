const express = require('express');
const multer = require('multer');
const path = require('path');
const authorizeRole = require('../middleware/authorizeRole');
const menuController = require('../controllers/menuController');
const uploadController = require('../controllers/uploadController');

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, path.join(process.cwd(), 'src/uploads')),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`)
});

const upload = multer({ storage });
const router = express.Router();

router.get('/', menuController.listMenu);
router.post('/upload', authorizeRole('Admin'), upload.single('image'), uploadController.uploadImage);
router.post('/', authorizeRole('Admin'), menuController.createMenuItem);
router.patch('/:id', authorizeRole('Admin'), menuController.updateMenuItem);
router.delete('/:id', authorizeRole('Admin'), menuController.deleteMenuItem);

module.exports = router;
