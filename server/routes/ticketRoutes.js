const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const { createTicket } = require('../controllers/ticketController');
const router = express.Router();

router.post('/create', verifyToken, createTicket);

module.exports = router;
