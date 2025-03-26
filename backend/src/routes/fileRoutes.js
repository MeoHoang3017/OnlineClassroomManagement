const express = require('express');
const upload = require('../utils/Upload'); // Multer configuration
const { uploadFile, downloadFile, uploadFiles, downloadFiles } = require('../controllers/fileController');

const router = express.Router();

// Upload File Route
router.post('/upload',
    upload.single('file'),
    async (req, res) => {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        } try {
            await uploadFile(req, res);
        } catch (error) {
            res.status(500).json({ error: error.message || "Internal Server Error" });
        }
    }
);

// Download File Route
router.get('/download/:fileId', async (req, res) => {
    try {
        await downloadFile(req, res);
    } catch (error) {
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
});

// Upload Multiple Files Route
router.post('/upload/multiple',
    upload.array('files', 10),
    async (req, res) => {
        if (!req.files) {
            return res.status(400).json({ error: "No files uploaded" });
        } try {
            await uploadFiles(req, res);
        } catch (error) {
            res.status(500).json({ error: error.message || "Internal Server Error" });
        }
    }
);

// Download Files Route
router.get('/download/lesson/:lessonId', async (req, res) => {
    try {
        await downloadFiles(req, res);
    } catch (error) {
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
});

module.exports = router;
