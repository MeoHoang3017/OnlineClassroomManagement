const { Classroom, Approvement } = require('../models/index');

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
        const classroom = await Classroom.findById(req.params.id).populate('createdBy', 'username');
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
        const classroom = await Classroom.findByIdAndDelete(req.params.id);
        if (!classroom) {
            return res.status(404).json({ error: 'Classroom not found' });
        }
        res.status(200).json({ message: 'Classroom deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

//Join a classroom
const joinClassroom = async (req, res) => {
    try {
        const classroom = await Classroom.findById(req.params.id);
        if (!classroom) {
            return res.status(404).json({ error: 'Classroom not found' });
        }
        if (classroom.students.includes(req.user.id)) {
            return res.status(400).json({ error: 'You are already in this classroom' });
        }
        const approvement = await Approvement.create({ userId: req.user.id, classId: req.params.id });
        classroom.approvements.push(approvement._id);
        console.log(approvement);
        await classroom.save();
        res.status(200).json(classroom);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const leaveClassroom = async (req, res) => {
    try {
        const classroom = await Classroom.findById(req.params.id);
        if (!classroom) {
            return res.status(404).json({ error: 'Classroom not found' });
        }
        classroom.students.pull(req.user.id);
        await classroom.save();
        res.status(200).json(classroom);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

//View students in a classroom
const viewStudentsInClassroom = async (req, res) => {
    try {
        const classroom = await Classroom.findById(req.params.id).populate('students');
        res.status(200).json(classroom.students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


//Get classrooms by user id
const getClassroomsByTeacher = async (req, res) => {
    try {
        const classrooms = await Classroom.find({ createdBy: req.user.id }).populate('createdBy', 'username');
        res.status(200).json(classrooms);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

//Get classrooms by user id
const getClassroomsByUser = async (req, res) => {
    try {
        const classrooms = await Classroom.find({ students: req.user.id });
        res.status(200).json(classrooms);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getAllClassrooms, getClassroomById, createClassroom, updateClassroom, deleteClassroom, joinClassroom,
    viewStudentsInClassroom, getClassroomsByTeacher, getClassroomsByUser, leaveClassroom
};