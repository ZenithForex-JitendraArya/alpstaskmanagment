const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const { createComment, getLastComment } = require('../controllers/commentController');
const router = express.Router();

router.post('/:ticketId', verifyToken, createComment);
router.get('/:ticketId', verifyToken, getLastComment);
module.exports = router;
