const express = require('express');
const teachersController = require('../controllers/teachers');

const router = express.Router();

router.get('/', teachersController.getTeachers);
router.get('/:id', teachersController.getTeacherById);
router.post('/', teachersController.createTeacher);
router.put('/:id', teachersController.updateTeacher);
router.delete('/:id', teachersController.deleteTeacher);

module.exports = router;