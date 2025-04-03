const express = require('express');
const router = express.Router();
const { getApprovementsByClassId, createApprovement, allowApprovement, rejectApprovement } = require('../controllers/approvementController');

router.get('/class/:id', getApprovementsByClassId);
router.post('/', createApprovement);
router.put('/allow/:approvementId', allowApprovement);
router.put('/reject/:approvementId', rejectApprovement);

module.exports = router;