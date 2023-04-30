class StudentDto {
    constructor(id_student, full_name, email, id_course, age) {
        this.id_student = id_student;
        this.full_name = full_name;
        this.email = email;
        this.id_course = id_course;
        this.age = age;
    }

    static fromModel(student) {
        return new StudentDto(
            student.id_student,
            student.full_name,
            student.email,
            student.id_course,
            student.age
        );
    }
}

module.exports = StudentDto;