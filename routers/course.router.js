const express = require('express');
const { createCourse, getCourseList, getCourseDetail, updateCourse, deleteCourse } = require('../controllers/course.controller.js');
const { isExist } = require('../middlewares/validation/isExist.js');
const { Course } = require('../models/index.js');
const { authenticate } = require('../middlewares/auth/authenticate.js');
const { authorize } = require('../middlewares/auth/authorize.js');

const courseRouter = express.Router();

courseRouter.get('/', getCourseList);
courseRouter.get('/:id', isExist(Course), getCourseDetail);
courseRouter.post('/', authenticate, authorize(["admin"]), createCourse);
courseRouter.put('/:id', authenticate, authorize(["admin"]), isExist(Course), updateCourse);
courseRouter.delete('/:id', authenticate, authorize(["admin"]), isExist(Course), deleteCourse);

module.exports = {
    courseRouter
}