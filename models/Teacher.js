const db = require('../config/db');

class Teacher {
    constructor(id_teacher, full_name, email, age) {
        this.id_teacher = id_teacher;
        this.full_name = full_name;
        this.email = email;
        this.age = age;
    }

    static async findAll() {
        const [rows] = await db.query('SELECT * FROM teachers');
        return rows.map(row => new Teacher(row.id_teacher, row.full_name, row.email, row.age));
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM teachers WHERE id_teacher = ?', [id]);
        if (rows.length === 0) return null;
        const row = rows[0];
        return new Teacher(row.id, row.full_name, row.email, row.age);
    }

    static async create(teacher) {
        const [result] = await db.query('INSERT INTO teachers (full_name, email, age) VALUES (?, ?, ?)', [teacher.full_name, teacher.email, teacher.age]);
        return new Teacher(result.insertId, teacher.full_name, teacher.email, teacher.age);
    }

    static async update(id, teacher) {
        const [result] = await db.query('UPDATE teachers SET full_name=?, email=?, age=? WHERE id_teacher=?', [teacher.full_name, teacher.email, teacher.age, id]);
        return new Teacher(id, teacher.full_name, teacher.email, teacher.age);
    }

    static async delete(id) {
        const [result] = await db.query('DELETE FROM teachers WHERE id_teacher = ?', [id]);
        return new Teacher(id, result.full_name, result.email, result.age);
    }
}

module.exports = Teacher;