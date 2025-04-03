const express = require('express');
const router = express.Router();

// Import middleware
const { authenticateJWT } = require('../middlewares/jwtMiddleware');

// Import routes
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const classroomRoutes = require('./classroomRoutes');
const lessonRoutes = require('./lessonRoutes');
const fileRoutes = require('./fileRoutes');
const otpRoutes = require('./otpRoutes');
const approveRoutes = require('./approveRoutes');

// Apply routes
router.use('/auth', authRoutes);
router.use('/users', authenticateJWT, userRoutes);
router.use('/classrooms', authenticateJWT, classroomRoutes);
router.use('/lessons', authenticateJWT, lessonRoutes);
router.use('/files', fileRoutes);
router.use('/otp', otpRoutes);
router.use('/approvements', authenticateJWT, approveRoutes);

module.exports = router;