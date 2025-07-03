const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

// ✅ Define the model
const tickets = sequelize.define('tickets', {
    ticket_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    details: {
        type: DataTypes.TEXT,
    },
    priority: {
        type: DataTypes.ENUM('LOW', 'MEDIUM', 'HIGH'),
        defaultValue: 'MEDIUM',
    },
    status: {
        type: DataTypes.ENUM('OPEN', 'PENDING', 'RESOLVED'),
        defaultValue: 'OPEN',
    },
    assignedTo: {
        type: DataTypes.INTEGER, // FK to users.user_id
    },
    project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'projects',
            key: 'project_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: 'is_active' 
    }
}, {
    timestamps: true,
});

// ✅ Do NOT call belongsTo here directly — export only the model!
module.exports = tickets;
