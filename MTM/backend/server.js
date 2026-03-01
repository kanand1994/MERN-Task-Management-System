const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Vite default port
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Debug Logger Middleware
app.use((req, res, next) => {
    console.log(`[Backend API] ${req.method} ${req.originalUrl}`);
    next();
});

// Routes will be mounted here
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

// Error handler middleware
app.use(errorHandler);

app.get('/', (req, res) => {
    res.send('Task Management API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
