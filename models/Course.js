const db = require('../config/db');

class Course {
    constructor(id_course, name, id_teacher, year, price) {
        this.id_course = id_course;
        this.name = name;
        this.id_teacher = id_teacher;
        this.year = year;
        this.price = price;
    }

    static async findAll() {
        const [rows] = await db.query('SELECT * FROM courses');
        return rows.map((row) => new Course(row.id_course, row.name, row.id_teacher, row.year, row.price));
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM courses WHERE id_course = ?', [id]);
        if (!rows.length) {
            throw new Error(`Course with ID ${id} not found`);
        }
        const row = rows[0];
        return new Course(row.id_course, row.name, row.id_teacher, row.year, row.price);
    }

    static async findByIdTeacherCourses(id) {
        const [rows] = await db.query('SELECT courses.id_course, courses.name, courses.id_teacher, courses.year, courses.price FROM courses ' +
            'JOIN teachers ON courses.id_teacher = teachers.id_teacher ' +
            'WHERE teachers.id_teacher = ?', [id]);
        if (rows.length === 0) return null;
        return rows.map((row) => new Course(row.id_course, row.name, row.id_teacher, row.year, row.price));
    }

    static async create(course) {
        const [result] = await db.query('INSERT INTO courses (name, id_teacher, year, price) VALUES (?, ?, ?, ?)', [course.name, course.id_teacher, course.year, course.price]);
        return new Course(result.insertId, course.name, course.id_teacher, course.year, course.price);
    }

    static async update(id, course) {
        const [result] = await db.query('UPDATE courses SET name = ?, id_teacher = ?, year = ?, price = ? WHERE id_course = ?', [course.name, course.id_teacher, course.year, course.price, id]);
        return new Course(id, course.name, course.id_teacher, course.year, course.price)
    }

    static async delete(id) {
        const [result] = await db.query('DELETE FROM courses WHERE id_course = ?', [id]);
        return new Course(id, result.name, result.id_teacher, result.year, result.price);
    }
}

module.exports = Course;