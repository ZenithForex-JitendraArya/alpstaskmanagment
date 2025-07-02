require('dotenv').config(); // so it can read .env

module.exports = {
    development: {
        username: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        host: process.env.HOST,
        dialect: 'postgres',
        logging: false,
    },
};
