const { Lesson } = require('../models/index');

//Get all lessons
const getLessons = async (req, res) => {
    try {
        const lessons = await Lesson.find().populate('createdBy', 'username').populate('class');
        res.status(200).json(lessons);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//Get lesson by id
const getLessonById = async (req, res) => {
    try {
        const lesson = await Lesson.findById(req.params.id);
        res.status(200).json(lesson);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//Create a new lesson
const createLesson = async (req, res) => {
    try {
        const { name, description, videoUrl, thumbnailUrl, classId, document } = req.body;
        const lesson = new Lesson({
            name, description, videoUrl, thumbnailUrl, classId, createdBy: req.user.id, document
        });
        await lesson.save();
        res.status(201).json(lesson);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//Update a lesson
const updateLesson = async (req, res) => {
    try {
        const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(lesson);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

//Delete a lesson
const deleteLesson = async (req, res) => {
    try {
        const lesson = await Lesson.findByIdAndDelete(req.params.id);
        if (!lesson) {
            return res.status(404).json({ error: 'Lesson not found' });
        }
        res.status(200).json({ message: 'Lesson deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

//Get lesson by class id
const getLessonByClassId = async (req, res) => {
    try {
        const lessons = await Lesson.find({ classId: req.params.id }).populate('createdBy', 'username').populate('class');
        res.status(200).json(lessons);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { getLessons, getLessonById, createLesson, updateLesson, deleteLesson, getLessonByClassId };