'use strict';

const { sequelize } = require('../config/db');

const users = require('./User');
const projects = require('./Project');
const tickets = require('./Ticket');
const comments = require('./comment');

// User–Project
users.hasMany(projects, { foreignKey: 'user_id' });
projects.belongsTo(users, { foreignKey: 'user_id' });

// Ticket–User (assignee)
tickets.belongsTo(users, {
    foreignKey: 'assignedTo',
    as: 'assignee'
});

// Ticket–Comment
tickets.hasMany(comments, {
    foreignKey: 'ticket_id',
    as: 'comments'
});
comments.belongsTo(tickets, {
    foreignKey: 'ticket_id',
    as: 'ticket'
});

// User–Comment
users.hasMany(comments, {
    foreignKey: 'user_id',
    as: 'comments'
});
comments.belongsTo(users, {
    foreignKey: 'user_id',
    as: 'author'
});

module.exports = {
    sequelize,
    users,
    projects,
    tickets,
    comments, 
};
