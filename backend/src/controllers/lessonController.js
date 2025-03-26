const { Lesson, File } = require('../models/index');

// Get all lessons
const getLessons = async (req, res) => {
    try {
        const lessons = await Lesson.find()
            .populate('createdBy', 'username')
            .populate('class')
            .populate('documents'); // Populate documents
        res.status(200).json(lessons);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get lesson by ID
const getLessonById = async (req, res) => {
    try {
        const lesson = await Lesson.findById(req.params.id)
            .populate('createdBy', 'username')
            .populate('class')
            .populate('documents'); // Populate documents
        if (!lesson) {
            return res.status(404).json({ error: 'Lesson not found' });
        }
        res.status(200).json(lesson);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new lesson
const createLesson = async (req, res) => {
    try {
        const { name, description, videoUrl, thumbnailUrl, classId, documents } = req.body;
        const lesson = new Lesson({
            name,
            description,
            videoUrl,
            thumbnailUrl,
            classId,
            documents,
            createdBy: req.user.id,
        });
        await lesson.save();
        res.status(201).json(lesson);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a lesson
const updateLesson = async (req, res) => {
    try {
        const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .populate('documents'); // Populate updated documents
        if (!lesson) {
            return res.status(404).json({ error: 'Lesson not found' });
        }
        res.status(200).json(lesson);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a lesson
const deleteLesson = async (req, res) => {
    try {
        const lesson = await Lesson.findByIdAndDelete(req.params.id);
        if (!lesson) {
            return res.status(404).json({ error: 'Lesson not found' });
        }
        // Optionally, delete associated documents (files)
        await File.deleteMany({ lessonId: lesson._id });
        res.status(200).json({ message: 'Lesson and associated documents deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get lessons by class ID
const getLessonByClassId = async (req, res) => {
    try {
        const lessons = await Lesson.find({ classId: req.params.id })
            .populate('createdBy', 'username')
            .populate('class')
            .populate('documents'); // Populate documents
        res.status(200).json(lessons);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getLessons, getLessonById, createLesson, updateLesson, deleteLesson, getLessonByClassId };
