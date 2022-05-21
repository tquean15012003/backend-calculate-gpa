const express = require('express');
const { courseRouter } = require('./course.router.js');
const { userRouter } = require('./user.router.js');

const rootRouter = express.Router();

rootRouter.use('/courses', courseRouter);
rootRouter.use('/users', userRouter)
module.exports = {
    rootRouter
}