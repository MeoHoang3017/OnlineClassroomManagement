const mongoose = require('mongoose');

const approvementSchema = new mongoose.Schema({
    userId: { type: String, ref: 'User', required: true },
    classId: { type: String, ref: 'Class', required: true },
    isRead: { type: Boolean, default: false },
    isAllowed: { type: Boolean, default: false },
    approvedBy: { type: String, ref: 'User' },
    approvedAt: { type: Date },
}, { timestamps: true }, {
    versionKey: false
});

const Approvement = mongoose.model('Approvement', approvementSchema);

module.exports = Approvement;
