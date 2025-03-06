const { Lesson } = require('../models/index');

//Get all lessons
const getLessons = async (req, res) => {
    try {
        const lessons = await Lesson.find();
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
        const lesson = await Lesson.create(req.body);
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
        await Lesson.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Lesson deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { getLessons, getLessonById, createLesson, updateLesson, deleteLesson };