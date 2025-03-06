const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true },
    classId: { type: String, ref: 'Classroom', required: true },
    thumbnailUrl: { type: String, required: true },
    createdBy: { type: String, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
});

const Lesson = mongoose.model('Lesson', lessonSchema);
module.exports = Lesson;