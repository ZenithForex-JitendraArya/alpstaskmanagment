
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const { sequelize } = require('./config/db'); // ✅ Use your Sequelize instance!
const { errorHandler } = require('./middleware/errorMiddleware');

const authRoutes = require('./routes/authRoutes');
const clientRoutes = require('./routes/clientRoutes');
const projectRoutes = require('./routes/projectRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const userRoutes=require('./routes/userRoutes')
const commentRoutes=require('./routes/commentRoutes');

const app = express();
console.log('hello')
// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
console.log('in app.js')
//testing
app.use('/', (req, res) => {
    res.send("testing");
});
  

// Routes
app.use('/api/user', userRoutes);
// app.use('/api/auth', authRoutes);
// app.use('/api/clients', clientRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/ticket', ticketRoutes);
app.use('/api/commets', commentRoutes

);

// Error handling middleware
app.use(errorHandler);

// ✅ DB connection test
sequelize.authenticate()
    .then(() => {
        console.log('🟢 PostgreSQL connected');
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () =>
            console.log(`🚀 Server running on http://localhost:${PORT}`)
        );
    })
    .catch(err => {
        console.error('🔴 DB connection error:', err);
        process.exit(1);
    });
