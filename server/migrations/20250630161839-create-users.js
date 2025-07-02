'use strict';
const { DataTypes } = require('sequelize');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      role: {
        type: Sequelize.STRING,
      },
      passwordHash: {
        type: Sequelize.STRING,
        field: 'password_hash' // Maps to the actual DB column
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at' // Maps to the actual DB column
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at' // Maps to the actual DB column
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
