const express = require('express');
const router = express.Router();
const { createClassroom, getAllClassrooms, getClassroomById, updateClassroom, deleteClassroom, joinClassroom, leaveClassroom,
    viewStudentsInClassroom, getClassroomsByTeacher, getClassroomsByUser } = require('../controllers/classroomController');
const { ensureAdmin, ensureTeacher, ensureStudent } = require('../middlewares/roleMiddleware');

//Teacher only
router.post('/', ensureTeacher, createClassroom);
router.put('/:id', ensureTeacher, updateClassroom);
router.delete('/:id', ensureTeacher, deleteClassroom);
router.get('/teacher', ensureTeacher, getClassroomsByTeacher);

//Others
router.get('/', getAllClassrooms);
router.get('/byId/:id', getClassroomById);
router.post('/join/:id', joinClassroom);
router.get('/user/', getClassroomsByUser);
router.post('/leave/:id', leaveClassroom);
router.get('/students/:id', viewStudentsInClassroom);

module.exports = router;