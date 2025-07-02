const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const projects = sequelize.define('projects', {
    project_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    status: {
        type: DataTypes.ENUM('ACTIVE', 'HOLD', 'COMPLETED'),
        defaultValue: 'ACTIVE',
    },
    user_id: { //who craeted it
        type: DataTypes.INTEGER,
        allowNull: false
    },
    startDate: {
        type: DataTypes.DATEONLY,
        field: 'start_date' // Maps to snake_case in DB
    },
    endDate: {
        type: DataTypes.DATEONLY,
        field: 'end_date' // Maps to snake_case in DB
    },
}, {
    timestamps: true,
});

module.exports = projects;
