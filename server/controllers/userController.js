const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { users } = require('../models'); // adjust path if needed

exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        // Validate input
        let errors = [];
        if (!name) errors.push('Name');
        if (!email) errors.push('Email');
        if (!password) errors.push('Password');
        if (!role) errors.push('Role');
        if (errors.length > 1) {
            return res.status(400).json({
                status: false,
                message: `The following fields are invalid or empty: ${errors.join(', ')}.`,
            });
        }
        // Check if email exists
        const existingUser = await users.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({
                status: false,
                message: 'Email already registered.',
            });
        }
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user  
        const newUser = await users.create({
            name,
            email,
            passwordHash: hashedPassword, // ✅ match your model field name!
            role
        });
          

        // Create JWT
        const token = jwt.sign(
            { user_id: newUser.user_id, role: newUser.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: process.env.JWT_EXPIRY_TIME }
        );

        res.status(201).json({
            message: 'users registered successfully.',
            user: {
                user_id: newUser.user_id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            },
            token
        });

    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validate input
        let errors = [];
        if (!email) errors.push('Email');
        if (!password) errors.push('Password');
        if (errors.length > 0) {
            return res.status(400).json({
                status: false,
                message: `Missing required fields: ${errors.join(', ')}.`,
            });
        }
        // Check if user exists
        const user = await users.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({
                status: false,
                message: 'Invalid credentials.', // Generic message for security
            });
        }
        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            return res.status(401).json({
                status: false,
                message: 'Invalid credentials.',
            });
        }
        // Create JWT token
        const token = jwt.sign(
            {
                user_id: user.user_id,
                role: user.role
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: process.env.JWT_EXPIRY_TIME }
        );
        console.log('token',token)
        // Successful login response
        res.status(200).json({
            status: true,
            message: 'Login successful.',
            user: {
                user_id: user.user_id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token,
            isLive:process.env.isLive
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({
            status: false,
            message: 'Server error during authentication.'
        });
    }
};
