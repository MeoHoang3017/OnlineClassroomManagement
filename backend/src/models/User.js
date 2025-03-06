const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    fullname: { type: String },
    phone: { type: String },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    role: { type: String, enum: ["Student", "Teacher", "Admin"], default: "User", required: true },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;