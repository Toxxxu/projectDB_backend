const CourseRatingService = require('../services/courseratings');
const CourseRatingDto = require('../dtos/CourseRatingDto');

const courseratingService = new CourseRatingService();

exports.getCourseRatings = async (req, res, next) => {
    try {
        const courseratings = await courseratingService.getAll();
        const courseratingDto = courseratings.map((courserating) => new CourseRatingDto(courserating));
        res.json(courseratingDto);
    } catch (error) {
        next(error);
    }
}

exports.getCourseRatingById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const courserating = await courseratingService.getById(id);
        if (!courserating) {
            const error = new Error('Rating not found');
            error.statusCode = 404;
            throw error;
        }
        const courseratingDto = new CourseRatingDto(courserating);
        res.json(courseratingDto);
    } catch (error) {
        next(error);
    }
}

exports.createCourseRating = async (req, res, next) => {
    const { student_id, course_id, comment, rating } = req.body;
    const courserating = { student_id, course_id, comment, rating };
    try {
        const createdCourseRating = await courseratingService.create(courserating);
        const courseratingDto = new CourseRatingDto(createdCourseRating);
        res.status(201).json(courseratingDto);
    } catch (error) {
        next(error);
    }
}

exports.updateCourseRating = async (req, res, next) => {
    const { id } = req.params;
    const { student_id, course_id, comment, rating } = req.body;
    const courserating = { student_id, course_id, comment, rating };
    try {
        const updatedCourseRating = await courseratingService.updateById(id, courserating);
        if (!updatedCourseRating) {
            const error = new Error('Rating not found');
            error.statusCode = 404;
            throw error;
        }
        const courseratingDto = new CourseRatingDto(updatedCourseRating);
        res.json(courseratingDto);
    } catch (error) {
        next(error);
    }
}

exports.deleteCourseRating = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletedCourseRating = await courseratingService.deleteById(id);
        if (!deletedCourseRating) {
            const error = new Error('Rating not found');
            error.statusCode = 404;
            throw error;
        }
        const courseratingDto = new CourseRatingDto(deletedCourseRating);
        res.json(courseratingDto);
    } catch (error) {
        next(error);
    }
}