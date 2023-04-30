const CourseRating = require('../models/CourseRating');
const CourseRatingDto = require('../dtos/CourseRatingDto');

class CourseRatingService {
    async getAll() {
        const courseratings = await CourseRating.findAll();
        return courseratings.map(CourseRatingDto.fromModel);
    }

    async create(data) {
        const courserating = await CourseRating.create(data);
        return CourseRatingDto.fromModel(courserating);
    }

    async getById(id) {
        const courserating = await CourseRating.findById(id);
        if (!courserating) {
            throw new Error('Rating not found');
        }
        return CourseRatingDto.fromModel(courserating);
    }

    async updateById(id, data) {
        const updatedCourseRating = await CourseRating.update(id, data);
        if (!updatedCourseRating) {
            throw new Error('Rating not found');
        }
        return CourseRatingDto.fromModel(updatedCourseRating);
    }

    async deleteById(id) {
        const deletedCourseRating = await CourseRating.delete(id);
        if (!deletedCourseRating) {
            throw new Error('Rating not found');
        }
        return CourseRatingDto.fromModel(deletedCourseRating);
    }
}

module.exports = CourseRatingService;