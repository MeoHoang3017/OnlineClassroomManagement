const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    studentId: { type: String, ref: 'User', required: true },
    classId: { type: String, ref: 'Classroom', required: true },
    isPresent: { type: Boolean, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;