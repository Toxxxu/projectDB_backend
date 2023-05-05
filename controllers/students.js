const StudentService = require('../services/students');
const StudentDto = require('../dtos/StudentDto');

const studentService = new StudentService();

exports.getStudents = async (req, res, next) => {
    try {
        const students = await studentService.getAll();
        // const studentDto = students.map((student) => new StudentDto(student));
        res.json(students);
    } catch (error) {
        next(error);
    }
};

exports.getStudentById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const student = await studentService.getById(id);
        if (!student) {
            const error = new Error('Student not found');
            error.statusCode = 404;
            throw error;
        }
        // const studentDto = new StudentDto(student);
        res.json(student);
    } catch (error) {
        next(error);
    }
};

exports.getStudentsByCourseId = async (req, res, next) => {
    const { id } = req.params;
    try {
        const students = await studentService.getStudentsByCourseId(id);
        if (!students) {
            const error = new Error('Students not found');
            error.statusCode = 404;
            throw error;
        }
        res.json(students);
    } catch (error) {
        next(error);
    }
};

exports.createStudent = async (req, res, next) => {
    const { full_name, email, id_course, age } = req.body;
    const student = { full_name, email, id_course, age };
    try {
        const createdStudent = await studentService.create(student);
        // const studentDto = new StudentDto(createdStudent);
        res.status(201).json(createdStudent);
    } catch (error) {
        next(error);
    }
};

exports.updateStudent = async (req, res, next) => {
    const { id } = req.params;
    const { full_name, email, id_course, age } = req.body;
    const student = { full_name, email, id_course, age };
    try {
        const updatedStudent = await studentService.updateById(id, student);
        if (!updatedStudent) {
            const error = new Error('Student not found');
            error.statusCode = 404;
            throw error;
        }
        // const studentDto = new StudentDto(updatedStudent);
        res.json(updatedStudent);
    } catch (error) {
        next(error);
    }
};

exports.deleteStudent = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletedStudent = await studentService.deleteById(id);
        if (!deletedStudent) {
            const error = new Error('Student not found');
            error.statusCode = 404;
            throw error;
        }
        // const studentDto = new StudentDto(deletedStudent);
        res.json(deletedStudent);
    } catch (error) {
        next(error);
    }
};