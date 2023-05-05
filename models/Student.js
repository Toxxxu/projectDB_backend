const db = require('../config/db');

class Student {
    constructor(id_student, full_name, email, id_course, age) {
        this.id_student = id_student;
        this.full_name = full_name;
        this.email = email;
        this.id_course = id_course;
        this.age = age;
    }

    static async findAll() {
        const [rows] = await db.query('SELECT * FROM students');
        return rows.map((row) => new Student(row.id_student, row.full_name, row.email, row.id_course, row.age));
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM students WHERE id_student = ?', [id]);
        if (!rows.length) {
            throw new Error(`Student with ID ${id} not found`);
        }
        const row = rows[0];
        return new Student(row.id_student, row.full_name, row.email, row.id_course, row.age);
    }

    static async findByIdCourseStudents(id) {
        const [rows] = await db.query('SELECT students.id_student, students.full_name, students.email, students.id_course, students.age FROM students ' +
            'JOIN courses ON students.id_course = courses.id_course ' +
            'WHERE students.id_course = ?', [id]);
        if(rows.length === 0) return null;
        return rows.map((row) => new Student(row.id_student, row.full_name, row.email, row.id_course, row.age));
    }

    static async create(student) {
        const [result] = await db.query('INSERT INTO students (full_name, email, id_course, age) VALUES (?, ?, ?, ?)', [student.full_name, student.email, student.id_course, student.age]);
        return new Student(result.insertId, student.full_name, student.email, student.id_course, student.age);
    }

    static async update(id, student) {
        const [result] = await db.query('UPDATE students SET full_name = ?, email = ?, id_course = ?, age = ? WHERE id_student = ?', [student.full_name, student.email, student.id_course, student.age, id]);
        return new Student(id, student.full_name, student.email, student.id_course, student.age);
    }

    static async delete(id) {
        const [result] = await db.query('DELETE FROM students WHERE id_student = ?', [id]);
        return new Student(id, result.full_name, result.email, result.id_course, result.age);
    }
}

module.exports = Student;