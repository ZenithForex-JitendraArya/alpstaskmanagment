const express = require('express');
const { createProject, getAllProject, getTicketsByProjectId } = require('../controllers/projectController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();
console.log('project controller')
router.get('/all', verifyToken, getAllProject);
router.get('/:projectId', verifyToken, getTicketsByProjectId);
router.post('/create', verifyToken, createProject);

module.exports = router;
