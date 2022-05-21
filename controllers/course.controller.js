const { Op } = require('sequelize');
const { Course } = require('../models/index.js');

// create course (admin onlu)
const createCourse = async (req, res) => {
    const course = {
        courseCode: req.body.courseCode,
        courseName: req.body.courseName,
        noAU: req.body.noAU
    };
    try {
        const newCourse = await Course.create(course);
        res.status(201).send({
            message: "Create course successfully",
            course: newCourse
        });
    } catch (error) {
        res.status(500).send(error);
    };

}

// get course list
const getCourseList = async (req, res) => {
    const { courseCode } = req.query;
    try {
        if (courseCode) {
            const courseList = await Course.findAll({
                where: {
                    courseCode: {
                        [Op.like]: `%${courseCode}%`
                    }
                }
            });
            res.status(200).send(courseList);
        } else {
            const courseList = await Course.findAll();
            res.status(200).send({
                message: "Get the course list successfully",
                courseList
            });
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

// get course detail
const getCourseDetail = async (req, res) => {
    const { id } = req.params;
    try {
        const course = await Course.findOne({
            where: {
                id
            }
        });
        res.status(200).send({
            message: "Get the course detail successfully",
            course
        });
    } catch (error) {
        res.status(500).send(error);
    };
}

// update course (admin only)
const updateCourse = async (req, res) => {
    const { id } = req.params;
    const course = {
        courseCode: req.body.courseCode,
        courseName: req.body.courseName,
        noAU: req.body.noAU
    };
    try {
        const updatedCourse = await Course.findOne({
            where: {
                id
            }
        });
        updatedCourse.courseCode = course.courseCode;
        updatedCourse.courseName = course.courseName;
        updatedCourse.noAU = course.noAU;
        await updatedCourse.save();
        res.status(200).send({
            message: "Update the course successfully",
            course: updatedCourse
        });
    } catch (error) {
        res.status(500).send(error);
    };
}

// delete course (admin only)
const deleteCourse = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCourse = await Course.findOne({
            where: {
                id
            }
        });
        await Course.destroy({
            where: {
                id
            }
        });
        res.status(200).send({
            message: "Delete the course successfully",
            course: deletedCourse
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    createCourse,
    getCourseList,
    getCourseDetail,
    updateCourse,
    deleteCourse
};