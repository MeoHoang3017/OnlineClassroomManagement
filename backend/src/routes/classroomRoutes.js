const express = require('express');
const router = express.Router();
const { createClassroom, getAllClassrooms, getClassroomById, updateClassroom, deleteClassroom, joinClassroom, viewStudentsInClassroom } = require('../controllers/classroomController');

router.get('/', getAllClassrooms);
router.get('/byId/:id', getClassroomById);
router.get('/students/:id', viewStudentsInClassroom);
router.post('/', createClassroom);
router.post('/join', joinClassroom);
router.put('/:id', updateClassroom);
router.delete('/:id', deleteClassroom);

module.exports = router;