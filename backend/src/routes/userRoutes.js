const express = require('express');
const router = express.Router();
const { getUsers, getUserById, createUser, updateUser, deleteUser, getUserInfo } = require('../controllers/userController');

router.get('/all', getUsers);
router.get('/by/:id', getUserById);
router.get('/info', getUserInfo);
router.post('/create', createUser);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);

module.exports = router;