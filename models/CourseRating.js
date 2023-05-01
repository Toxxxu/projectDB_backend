const db = require('../config/db');

class CourseRating {
    constructor(id, student_id, course_id, comment, rating) {
        this.id = id;
        this.student_id = student_id;
        this.course_id = course_id;
        this.comment = comment;
        this.rating = rating;
    }

    static async findAll() {
        const [rows] = await db.query('SELECT * FROM course_rating');
        return rows.map((row) => new CourseRating(row.id, row.student_id, row.course_id, row.comment, row.rating));
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM course_rating WHERE id = ?', [id]);
        if (!rows.length) {
            throw new Error(`Rating wtih ID ${id} not found`);
        }
        const row = rows[0];
        return new CourseRating(row.id, row.student_id, row.course_id, row.comment, row.rating);
    }

    static async create(rate) {
        const [result] = await db.query('INSERT INTO course_rating (student_id, course_id, comment, rating) VALUES (?, ?, ?, ?)', [rate.student_id, rate.course_id, rate.comment, rate.rating]);
        return new CourseRating(result.insertId, rate.student_id, rate.course_id, rate.comment, rate.rating);
    }

    static async update(id, rate) {
        const [result] = await db.query('UPDATE course_rating SET student_id = ?, course_id = ?, comment = ?, rating = ? WHERE id = ?', [rate.student_id, rate.course_id, rate.comment, rate.rating, id]);
        return new CourseRating(id, rate.student_id, rate.course_id, rate.comment, rate.rating);
    }

    static async delete(id) {
        const [result] = await db.query('DELETE FROM course_rating WHERE id = ?', [id]);
        return new CourseRating(id, result.student_id, result.course_id, result.comment, result.rating);
    }
}

module.exports = CourseRating;