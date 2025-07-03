'use strict';

const { sequelize } = require('../config/db');
const users = require('./User');
// const clients = require('./Client');
const projects = require('./Project');
const tickets = require('./Ticket');


//  clients —< projects
// clients.hasMany(projects, { foreignKey: 'project_id' });
// projects.belongsTo(clients, { foreignKey: 'client_id' });

//   projects —< tickets
// projects.hasMany(tickets, { foreignKey: 'ticket_id' });
// tickets.belongsTo(projects, { foreignKey: 'project_id' });

//   clients —< tickets
// clients.hasMany(tickets, { foreignKey: 'ticket_id' });
// tickets.belongsTo(clients, { foreignKey: 'client_id' });

//   users —< tickets (assignedTo)
// users.hasMany(tickets, { foreignKey: 'assignedTo' });
// tickets.belongsTo(users, { as: 'Assignee', foreignKey: 'assignedTo' });

users.hasMany(projects, { foreignKey: 'user_id' });
projects.belongsTo(users, { foreignKey: 'user_id' });
tickets.belongsTo(users, {
    foreignKey: 'assignedTo',
    as: 'assignee'
});


module.exports = {
    sequelize,
    users,
    // clients,
    projects,
    tickets,
};
