const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();
const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.USER,
    process.env.PASSWORD,
    {
        host: process.env.HOST,
        dialect: 'postgres',
        logging: false,
        define: {
            underscored: true,    // Converts createdAt → created_at, updatedAt → updated_at
            timestamps: true     // Ensure Sequelize manages timestamps
        }
    },
);
module.exports = { sequelize };

