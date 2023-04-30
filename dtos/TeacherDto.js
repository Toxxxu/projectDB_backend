class TeacherDto {
    constructor(id_teacher, full_name, email, age) {
        this.id_teacher = id_teacher;
        this.full_name = full_name;
        this.email = email;
        this.age = age;
    }

    static fromModel(teacher) {
        return new TeacherDto(
            teacher.id_teacher,
            teacher.full_name,
            teacher.email,
            teacher.age
        );
    }

    static fromRequest(request) {
        const { full_name, email, age } = request.body;
        return new TeacherDto(null, full_name, email, age);
    }
}

module.exports = TeacherDto;