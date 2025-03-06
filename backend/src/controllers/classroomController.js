const { Classroom } = require('../models/index');

//Get all classrooms
const getClassrooms = async (req, res) => {
    try {
        const classrooms = await Classroom.find();
        res.status(200).json(classrooms);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//Get classroom by id
const getClassroomById = async (req, res) => {
    try {
        const classroom = await Classroom.findById(req.params.id);
        res.status(200).json(classroom);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//Create a new classroom
const createClassroom = async (req, res) => {
    try {
        const { name, description, students } = req.body;
        if (!name || !description) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const classroom = await Classroom.create({ name, description, students });
        res.status(201).json(classroom);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//Update a classroom
const updateClassroom = async (req, res) => {
    try {
        const classroom = await Classroom.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(classroom);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

//Delete a classroom
const deleteClassroom = async (req, res) => {
    try {
        await Classroom.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Classroom deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { getClassrooms, getClassroomById, createClassroom, updateClassroom, deleteClassroom };