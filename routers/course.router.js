const express = require('express');
const { createCourse, getCourseList, getCourseDetail, updateCourse, deleteCourse } = require('../controllers/course.controller.js');
const { isExist } = require('../middlewares/validation/isExist.js');
const { Course } = require('../models/index.js');

const courseRouter = express.Router();

courseRouter.post('/', createCourse);
courseRouter.get('/', getCourseList);
courseRouter.get('/:id', isExist(Course), getCourseDetail);
courseRouter.put('/:id', isExist(Course), updateCourse);
courseRouter.delete('/:id', isExist(Course), deleteCourse);

module.exports = {
    courseRouter
}