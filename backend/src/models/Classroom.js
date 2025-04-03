const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({
    classCode: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    students: {
        type: [String],
        ref: 'User',
        default: []
    },
    approvements: {
        type: [String],
        ref: 'Approvement',
        default: []
    },
    createdBy: { type: String, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
});

classroomSchema.virtual("creator", {
    ref: "User",
    localField: "createdBy",
    foreignField: "_id",
    justOne: true
});

const Classroom = mongoose.model('Classroom', classroomSchema);


module.exports = Classroom;