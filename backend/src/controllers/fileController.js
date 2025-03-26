const { File, Lesson } = require('../models/index');
const drive = require('../utils/GoogleDrive');
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// Upload File
const uploadFile = async (req, res) => {
    try {
        const { lessonId } = req.body;

        // Validate required fields
        if (!lessonId) {
            return res.status(400).json({ error: 'Lesson ID is required' });
        }
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // File metadata for Google Drive
        const fileMetadata = {
            name: req.file.filename,
            parents: [process.env.GOOGLE_DRIVE_FOLDER_ID],
        };

        const media = {
            mimeType: req.file.mimetype,
            body: fs.createReadStream(req.file.path),
        };

        // Upload file to Google Drive
        const response = await drive.files.create({
            resource: fileMetadata,
            media,
            fields: 'id, webViewLink',
        });

        // Save file details to the database
        const newFile = new File({
            filename: req.file.filename,
            fileId: response.data.id,
            fileUrl: response.data.webViewLink,
            lessonId,
        });
        await newFile.save();

        // Clean up local file
        fs.unlinkSync(req.file.path);

        res.status(200).json({
            message: 'File uploaded successfully',
            fileId: response.data.id,
            fileUrl: response.data.webViewLink,
        });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};

// Download File
const downloadFile = async (req, res) => {
    try {
        const fileId = req.params.fileId;

        // Check if the file exists in the database
        const file = await File.findOne({ fileId });
        if (!file) {
            return res.status(404).json({ error: 'File not found in the database' });
        }

        try {
            // Fetch the file from Google Drive
            const response = await drive.files.get(
                {
                    fileId,
                    alt: 'media',
                },
                { responseType: 'stream' }
            );

            // Set response headers
            res.setHeader('Content-Disposition', `attachment; filename="${path.basename(file.filename)}"`);
            res.setHeader('Content-Type', file.mimetype || 'application/octet-stream');

            // Stream the file to the client
            response.data.pipe(res);
        } catch (driveError) {
            console.error('Google Drive Error:', driveError.response?.data || driveError.message);
            return res.status(driveError.response?.status || 500).json({
                error: driveError.response?.data?.error?.message || 'Failed to download file from Google Drive',
            });
        }
    } catch (error) {
        console.error('Error downloading file:', error);
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};

const uploadFiles = async (req, res) => {
    try {
        const { lessonId } = req.body;

        // Validate required fields
        if (!lessonId) {
            return res.status(400).json({ error: 'Lesson ID is required' });
        }
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No files uploaded' });
        }

        const uploadedFiles = [];

        for (const file of req.files) {
            // File metadata for Google Drive
            const fileMetadata = {
                name: file.filename,
                parents: [process.env.GOOGLE_DRIVE_FOLDER_ID],
            };

            const media = {
                mimeType: file.mimetype,
                body: fs.createReadStream(file.path),
            };

            // Upload file to Google Drive
            const response = await drive.files.create({
                resource: fileMetadata,
                media,
                fields: 'id, webViewLink',
            });

            // Save file details to the database
            const newFile = new File({
                filename: file.filename,
                fileId: response.data.id,
                fileUrl: response.data.webViewLink,
                lessonId,
            });
            await newFile.save();

            // Add file to the uploadedFiles array
            uploadedFiles.push({
                _id: newFile._id,
                filename: newFile.filename,
                fileId: newFile.fileId,
                fileUrl: newFile.fileUrl,
            });

            // Clean up local file
            fs.unlinkSync(file.path);
        }

        //Update the lesson document with the new files
        const lesson = await Lesson.findById(lessonId);
        if (!lesson) {
            return res.status(404).json({ error: 'Lesson not found' });
        }
        lesson.documents.push(...uploadedFiles.map(file => file._id));
        await lesson.save();

        // console.log("Lesson updated with new files:", lesson);

        res.status(200).json({
            message: 'Files uploaded successfully',
            files: uploadedFiles,
        });
    } catch (error) {
        console.error('Error uploading files:', error);
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};

const downloadFiles = async (req, res) => {
    try {
        const { lessonId } = req.params;

        // Fetch files associated with the lesson
        const files = await File.find({ lessonId });
        if (files.length === 0) {
            return res.status(404).json({ error: 'No files found for the specified lesson ID' });
        }

        // Set response headers
        res.setHeader('Content-Disposition', 'attachment; filename="lesson-files.zip"');
        res.setHeader('Content-Type', 'application/zip');

        // Create a zip archive
        const archive = archiver('zip', {
            zlib: { level: 9 } // Set the compression level
        });

        // Pipe the archive to the response
        archive.pipe(res);

        // Append files to the archive
        for (const file of files) {
            const response = await drive.files.get(
                {
                    fileId: file.fileId,
                    alt: 'media',
                },
                { responseType: 'stream' }
            );

            archive.append(response.data, { name: file.filename });
        }

        // Finalize the archive
        archive.finalize();
    } catch (error) {
        console.error('Error downloading files:', error);
        if (!res.headersSent) {
            res.status(500).json({ error: error.message || 'Internal Server Error' });
        }
    }
};

module.exports = { uploadFile, downloadFile, uploadFiles, downloadFiles };
