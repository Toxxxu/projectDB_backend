const Student = require('../models/Student');
const StudentDto = require('../dtos/StudentDto');

class StudentService {
    async getAll() {
        const students = await Student.findAll();
        return students.map(StudentDto.fromModel);
    }

    async create(data) {
        const student = await Student.create(data);
        return StudentDto.fromModel(student);
    }

    async getById(id) {
        const student = await Student.findById(id);
        if (!student) {
            throw new Error('Student not found');
        }
        return StudentDto.fromModel(student);
    }

    async updateById(id, data) {
        const updatedStudent = await Student.update(id, data);
        if (!updatedStudent) {
            throw new Error('Student not found');
        }
        return StudentDto.fromModel(updatedStudent);
    }

    async deleteById(id) {
        const deletedStudent = await Student.delete(id);
        if (!deletedStudent) {
            throw new Error('Student not found');
        }
        return StudentDto.fromModel(deletedStudent);
    }
}

module.exports = StudentService;