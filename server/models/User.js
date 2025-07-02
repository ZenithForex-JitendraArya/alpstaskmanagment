const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const users = sequelize.define('users', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: { isEmail: true },
    },
    passwordHash: {  // camelCase to match your DB column
        type: DataTypes.STRING,
        field: 'password_hash' // Maps to snake_case in DB
      },
    role: {
        type: DataTypes.ENUM('ADMIN', 'CLIENT'),
        defaultValue: 'CLIENT',
    },
}, {
    timestamps: true,
});

module.exports = users;
