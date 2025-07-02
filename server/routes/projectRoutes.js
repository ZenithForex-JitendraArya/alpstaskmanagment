const express = require('express');
const { createProject, getAllProject } = require('../controllers/projectController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/all', verifyToken, getAllProject);
router.use('/create', verifyToken, createProject);

module.exports = router;
