const express = require('express');

const {
  getLessons,
  getLesson,
  addLesson,
  updateLesson,
  deleteLesson,
} = require('../controllers/lessons');

const Lesson = require('../models/Lesson');
// const advancedResults = require('../middleware/advancedResults');

const router = express.Router({ mergeParams: true });

const { protect } = require('../middleware/auth');

router
  .route('/')
  .get(
    protect,
    // advancedResults(Lesson, {
    //   path: 'day',
    //   select: 'title',
    // }),
    getLessons
  )
  .post(protect, addLesson);
router
  .route('/:id')
  .get(protect, getLesson)
  .put(protect, updateLesson)
  .delete(protect, deleteLesson);

module.exports = router;
