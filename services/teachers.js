const Teacher = require('../models/Teacher');
const TeacherDto = require('../dtos/TeacherDto');

class TeachersService {
    async getAll() {
        const teachers = await Teacher.findAll();
        return teachers.map(TeacherDto.fromModel);
    }

    async create(data) {
        const teacher = await Teacher.create(data);
        return TeacherDto.fromModel(teacher);
    }

    async getById(id) {
        const teacher = await Teacher.findById(id);
        if (!teacher) {
            throw new Error('Teacher not found');
        }
        return TeacherDto.fromModel(teacher);
    }

    async updateById(id, data) {
        const updatedTeacher = await Teacher.update(id, data);
        if (!updatedTeacher) {
            throw new Error('Teacher not found');
        }
        return TeacherDto.fromModel(updatedTeacher);
    }

    async deleteById(id) {
        const deletedteacher = await Teacher.delete(id);
        if (!deletedteacher) {
            throw new Error('Teacher not found');
        }
        return TeacherDto.fromModel(deletedteacher);
    }
}

module.exports = TeachersService;