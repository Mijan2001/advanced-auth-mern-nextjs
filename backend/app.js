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
            'https://auth-react-mu-seven.vercel.app',
            'https://eclectic-sherbet-15d12d.netlify.app',
            'https://auth-nextjs-typescript-frontend.netlify.app',
            'https://next-auth-typescript.netlify.app'
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
