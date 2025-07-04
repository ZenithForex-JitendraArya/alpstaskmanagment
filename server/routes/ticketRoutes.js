const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const { createTicket, updateTicket, deleteTicket } = require('../controllers/ticketController');
const router = express.Router();

router.post('/create', verifyToken, createTicket);
router.put('/:ticketId', verifyToken, updateTicket);
router.delete('/:ticketId', verifyToken, deleteTicket);


module.exports = router;
