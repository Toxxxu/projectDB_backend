class CourseDto {
    constructor(id_course, name, id_teacher, year, price) {
        this.id_course = id_course;
        this.name = name;
        this.id_teacher = id_teacher;
        this.year = year;
        this.price = price;
    }

    static fromModel(course) {
        return new CourseDto(
            course.id_course,
            course.name,
            course.id_teacher,
            course.year,
            course.price
        );
    }
}

module.exports = CourseDto;