const express = require('express');
const router = express.Router();

// Example controller imports
// const { getTickets, createTicket, updateTicket, deleteTicket } = require('../controllers/ticketController');

router.get('/', (req, res) => {
    res.json({ message: 'tickets route works!' });
});

module.exports = router;
