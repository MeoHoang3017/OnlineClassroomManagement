const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true },
    classId: { type: String, ref: 'Classroom', required: true },
    documents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }], // List of document references
    thumbnailUrl: { type: String, required: true },
    createdBy: { type: String, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
});

lessonSchema.virtual('creator', {
    ref: 'User',
    localField: 'createdBy',
    foreignField: '_id',
    justOne: true,
});

lessonSchema.virtual('class', {
    ref: 'Classroom',
    localField: 'classId',
    foreignField: '_id',
    justOne: true,
});

lessonSchema.set('toJSON', { virtuals: true });
const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = Lesson;
