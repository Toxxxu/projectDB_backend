const CourseService = require('../services/courses');
const CourseDto = require('../dtos/CourseDto');

const courseService = new CourseService();

exports.getCourses = async (req, res, next) => {
    try {
        const courses = await courseService.getAll();
        // const coursesDto = courses.map((course) => new CourseDto(course));
        res.json(courses);
    } catch (error) {
        next(error);
    }
};

exports.getCourseById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const course = await courseService.getById(id);
        if (!course) {
            const error = new Error('Course not found');
            error.statusCode = 404;
            throw error;
        }
        // const courseDto = new CourseDto(course);
        res.json(course);
    } catch (error) {
        next(error);
    }
};

exports.getCoursesByTeacherId = async (req, res, next) => {
    const { id } = req.params;
    try {
        const courses = await courseService.getCoursesByTeacherId(id);
        if (!courses) {
            const error = new Error('Courses not found');
            error.statusCode = 404;
            throw error;
        }
        res.json(courses);
    } catch (error) {
        next(error);
    }
};

exports.createCourse = async (req, res, next) => {
    const { name, id_teacher, year, price } = req.body;
    const course = { name, id_teacher, year, price };
    try {
        const createdcourse = await courseService.create(course);
        // const courseDto = new CourseDto(createdcourse);
        res.status(201).json(createdcourse);
    } catch (error) {
        next(error);
    }
};

exports.updateCourse = async (req, res, next) => {
    const { id } = req.params;
    const { name, id_teacher, year, price } = req.body;
    const course = { name, id_teacher, year, price };
    try {
        const updatedCourse = await courseService.updateById(id, course);
        if (!updatedCourse) {
            const error = new Error('Course not found');
            error.statusCode = 404;
            throw error;
        }
        // const courseDto = new CourseDto(updatedCourse);
        res.json(updatedCourse);
    } catch (error) {
        next(error);
    }
};

exports.deleteCourse = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletedCourse = await courseService.deletedById(id);
        if (!deletedCourse) {
            const error = new Error('Course not found');
            error.statusCode = 404;
            throw error;
        }
        // const courseDto = new CourseDto(deletedCourse);
        res.json(deletedCourse);
    } catch (error) {
        next(error);
    }
};