const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const { createComment } = require('../controllers/commentController');
const router = express.Router();

router.post('/:ticketId', verifyToken, createComment);
module.exports = router;
