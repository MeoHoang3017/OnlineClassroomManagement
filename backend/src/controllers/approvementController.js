const { Approvement, Classroom } = require('../models/index');

const getApprovementsByClassId = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const approvements = await Approvement.find({ classId: id, isRead: false });
        res.status(200).json(approvements);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createApprovement = async (req, res) => {
    try {
        const approvement = await Approvement.create(req.body);
        res.status(201).json(approvement);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const allowApprovement = async (req, res) => {
    try {
        const { approvementId } = req.params;
        const approvement = await Approvement.findById(approvementId);
        if (!approvement) {
            return res.status(404).json({ error: 'Approvement not found' });
        }
        approvement.isAllowed = true;
        approvement.isRead = true;
        approvement.approvedBy = req.user._id;
        await approvement.save();
        const classroom = await Classroom.findById(approvement.classId);
        classroom.students.push(approvement.userId);
        await classroom.save();
        res.status(200).json(approvement);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const rejectApprovement = async (req, res) => {
    try {
        const { approvementId } = req.params;
        const approvement = await Approvement.findById(approvementId);
        if (!approvement) {
            return res.status(404).json({ error: 'Approvement not found' });
        }
        approvement.isAllowed = false;
        approvement.isRead = true;
        approvement.approvedBy = req.user._id;
        await approvement.save();
        res.status(200).json(approvement);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = { getApprovementsByClassId, createApprovement, allowApprovement, rejectApprovement };