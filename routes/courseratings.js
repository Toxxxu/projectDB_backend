const express = require('express');
const courseratingsController = require('../controllers/courseratings');

const router = express.Router();

router.get('/', courseratingsController.getCourseRatings);
router.get('/:id', courseratingsController.getCourseRatingById);
router.post('/', courseratingsController.createCourseRating);
router.put('/:id', courseratingsController.updateCourseRating);
router.delete('/:id', courseratingsController.deleteCourseRating);

module.exports = router;