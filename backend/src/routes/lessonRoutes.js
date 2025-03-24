const express = require('express');
const router = express.Router();
const { createLesson, getLessons, getLessonById, updateLesson, deleteLesson, getLessonByClassId } = require('../controllers/lessonController');
const { ensureTeacher } = require('../middlewares/roleMiddleware');
router.get('/', getLessons);
router.get('/lesson/:id', getLessonById);
router.post('/create', ensureTeacher, createLesson);
router.put('/:id', ensureTeacher, updateLesson);
router.delete('/:id', ensureTeacher, deleteLesson);
router.get('/class/:id', getLessonByClassId);

module.exports = router;