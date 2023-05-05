const Course = require('../models/Course');
const CourseDto = require('../dtos/CourseDto');

class CourseService {
    async getAll() {
        const courses = await Course.findAll();
        return courses.map(CourseDto.fromModel);
    }

    async create(data) {
        const course = await Course.create(data);
        return CourseDto.fromModel(course);
    }
    
    async getById(id) {
        const course = await Course.findById(id);
        if (!course) {
            throw new Error('Course not found');
        }
        return CourseDto.fromModel(course);
    }

    async getCoursesByTeacherId(id) {
        const courses = await Course.findByIdTeacherCourses(id);
        return courses.map(CourseDto.fromModel);
    }

    async updateById(id, data) {
        const updatedCourse = await Course.update(id, data);
        if (!updatedCourse) {
            throw new Error('Course not found');
        }
        return CourseDto.fromModel(updatedCourse);
    }

    async deletedById(id) {
        const deletedcourse = await Course.delete(id);
        if (!deletedcourse) {
            throw new Error('Course not found');
        }
        return CourseDto.fromModel(deletedcourse);
    }
}

module.exports = CourseService;