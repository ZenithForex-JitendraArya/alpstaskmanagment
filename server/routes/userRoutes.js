const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const router = express.Router();

// Example controller — make it or adjust to yours
// const { getClients, createClient } = require('../controllers/clientController');
// console.log('register')
router.post('/register', registerUser);
router.post('/login', loginUser);
module.exports = router;
