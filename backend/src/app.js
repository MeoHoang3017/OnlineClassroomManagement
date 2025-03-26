require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const connectDB = require('./config/database');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const routes = require('./routes');
const { logger, applyConfig } = require('./config');

const app = express();
app.use(cookieParser());

// Apply middlewares
applyConfig(app);

// Connect to MongoDB
connectDB();
app.use(morgan('dev'));
app.use(helmet());

// Middleware to parse JSON bodies with increased limit
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure session with connect-mongo
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'default_secret',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI, // Use your MongoDB URI here
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, // 1 day
        },
    })
);

app.use('/api', routes);

// Error Handling Middleware
app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app;
