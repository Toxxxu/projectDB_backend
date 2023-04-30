class CourseRatingDto {
    constructor(id, student_id, course_id, comment, rating) {
        this.id = id;
        this.student_id = student_id;
        this.course_id = course_id;
        this.comment = comment;
        this.rating = rating;
    }

    static fromModel(rate) {
        return new CourseRatingDto(
            rate.id,
            rate.student_id,
            rate.course_id,
            rate.comment,
            rate.rating
        );
    }
}

module.exports = CourseRatingDto;