const express = require('express');
const { courseRouter } = require('./course.router.js');

const rootRouter = express.Router();

rootRouter.use('/courses', courseRouter);

module.exports = {
    rootRouter
}