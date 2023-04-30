const express = require('express');
const coursesController = require('../controllers/courses');

const router = express.Router();

router.get('/', coursesController.getCourses);
router.get('/:id', coursesController.getCourseById);
router.post('/', coursesController.createCourse);
router.put('/:id', coursesController.updateCourse);
router.delete('/:id', coursesController.deleteCourse);

module.exports = router;