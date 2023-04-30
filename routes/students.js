const express = require('express');
const studentsController = require('../controllers/students');

const router = express.Router();

router.get('/', studentsController.getStudents);
router.get('/:id', studentsController.getStudentById);
router.post('/', studentsController.createStudent);
router.put('/:id', studentsController.updateStudent);
router.delete('/:id', studentsController.deleteStudent);

module.exports = router;