const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { users } = require('../models');

// Register a new users
exports.register = async (req, res, next) => {
    try {
        const { username, email, password, role } = req.body;

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const users = await users.create({
            username,
            email,
            password: hashedPassword,
            role,
        });

        res.status(201).json({
            success: true,
            data: { id: users.id, username: users.username, role: users.role },
        });
    } catch (err) {
        next(err);
    }
};

// Login users
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if users exists
        const users = await users.findOne({ where: { email } });
        if (!users) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, users.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: users.id, role: users.role },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        res.json({
            success: true,
            token,
            users: { id: users.id, username: users.username, role: users.role },
        });
    } catch (err) {
        next(err);
    }
};