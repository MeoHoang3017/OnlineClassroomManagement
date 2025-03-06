const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    students: [{
        type: String, ref: 'User'
    }],
    createdBy: { type: String, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
});

const Classroom = mongoose.model('Classroom', classroomSchema);

Classroom.create = async (classroomData) => {
    const classroom = new Classroom(classroomData);
    await classroom.save();
    return classroom;
}

module.exports = Classroom;