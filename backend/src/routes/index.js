const express = require('express');
const router = express.Router();

// Import middleware
const { authenticateJWT } = require('../middlewares/jwtMiddleware');

// Import routes
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const classroomRoutes = require('./classroomRoutes');

// Apply routes
router.use('/auth', authRoutes);
router.use('/users', authenticateJWT, userRoutes);
router.use('/classrooms', authenticateJWT, classroomRoutes);

module.exports = router;