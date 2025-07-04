require('dotenv').config(); // so it can read .env

// module.exports = {
//     development: {
//         username: process.env.USER,
//         password: process.env.PASSWORD,
//         database: process.env.DATABASE,
//         host: process.env.HOST,
//         dialect: 'postgres',
//         logging: false,
//     },
//     development: {
//         username: process.env.USER,
//         password: process.env.PASSWORD,
//         database: process.env.DATABASE,
//         host: process.env.HOST,
//         dialect: 'postgres',
//         logging: false,
//     },
// };
module.exports = {
    development: {
        use_env_variable: 'DATABASE_URL',
        dialect: 'postgres',
        dialectOptions: {
            // ssl: {
            //     require: true,
            //     rejectUnauthorized: false
            // }
        }
    },
    production: {
        use_env_variable: 'DATABASE_URL',
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
};
