const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const { createTicket, getClientTickets } = require('../controllers/ticketController');
const router = express.Router();

router.post('/create/:projectId', verifyToken, createTicket);
router.get('/client', verifyToken, getClientTickets); // Client view

module.exports = router;
