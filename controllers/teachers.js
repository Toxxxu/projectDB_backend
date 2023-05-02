const TeachersService = require('../services/teachers');
const TeacherDto = require('../dtos/TeacherDto');

const teacherService = new TeachersService();

exports.getTeachers = async (req, res, next) => {
    try {
        const teachers = await teacherService.getAll();
        // const teachersDto = teachers.map((teacher) => new TeacherDto(teacher));
        res.json(teachers);
    } catch (error) {
        next(error);
    }
};

exports.getTeacherById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const teacher = await teacherService.getById(id);
        if (!teacher) {
            const error = new Error('Teacher not found');
            error.statusCode = 404;
            throw error;
        }
        // const teacherDto = new TeacherDto(teacher);
        res.json(teacher);
    } catch (error) {
        next(error);
    }
};

exports.createTeacher = async (req, res, next) => {
    const { full_name, email, age } = req.body;
    const teacher = { full_name, email, age };
    try {
        const createdTeacher = await teacherService.create(teacher);
        // const teacherDto = new TeacherDto(createdTeacher);
        res.status(201).json(createdTeacher);
    } catch (error) {
        next(error);
    }
}

exports.updateTeacher = async (req, res, next) => {
    const { id } = req.params;
    const { full_name, email, age } = req.body;
    const teacher = { full_name, email, age };
    try {
        const updatedTeacher = await teacherService.updateById(id, teacher);
        if (!updatedTeacher) {
            const error = new Error('Teacher not found');
            error.statusCode = 404;
            throw error;
        }
        // const teacherDto = new TeacherDto(updatedTeacher);
        res.json(updatedTeacher);
    } catch (error) {
        next(error);
    }
};

exports.deleteTeacher = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletedTeacher = await teacherService.deleteById(id);
        if (!deletedTeacher) {
            const error = new Error('Teacher not found');
            error.statusCode = 404;
            throw error;
        }
        // const teacherDto = new TeacherDto(deletedTeacher);
        res.json(deletedTeacher);
    } catch (error) {
        next(error);
    }
};