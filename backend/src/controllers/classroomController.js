const { Classroom } = require('../models/index');

//Get all classrooms
const getAllClassrooms = async (req, res) => {
    try {
        const classrooms = await Classroom.find().populate('createdBy', 'username');
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
        const { classCode, name, description } = req.body;
        const user = req.user;
        if (!name || !description) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const classroom = await Classroom.create({ classCode: classCode, name, description, createdBy: user.id });
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

//Join a classroom
const joinClassroom = async (req, res) => {
    try {
        const classroom = await Classroom.findById(req.params.id);
        classroom.users.push(req.user.id);
        await classroom.save();
        res.status(200).json(classroom);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

//View students in a classroom
const viewStudentsInClassroom = async (req, res) => {
    try {
        const classroom = await Classroom.findById(req.params.id).populate('users');
        res.status(200).json(classroom.users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { getAllClassrooms, getClassroomById, createClassroom, updateClassroom, deleteClassroom, joinClassroom, viewStudentsInClassroom };