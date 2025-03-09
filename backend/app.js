const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const globalErrorHandler = require('./controller/errorController');
const userRouter = require('./routes/userRouters');
const AppError = require('./utils/appError');

const app = express();

app.use(cookieParser());

app.use(
    cors({
        origin: [
            'http://localhost:5173',
            'http://localhost:3000',
            'https://advanced-authentication-mern.vercel.app'
        ],
        credentials: true
    })
);

app.use(express.json({ limit: '50mb' }));

// Users api urls============
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
