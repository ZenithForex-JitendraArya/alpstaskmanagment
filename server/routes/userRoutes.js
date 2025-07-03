const express = require('express');
const { registerUser, loginUser, getAllActiveUsers } = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

// Example controller — make it or adjust to yours
// const { getClients, createClient } = require('../controllers/clientController');
// console.log('register')
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', verifyToken, getAllActiveUsers);

module.exports = router;
