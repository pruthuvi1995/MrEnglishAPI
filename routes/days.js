const express = require('express');

const {
  getDays,
  getDay,
  createDay,
  updateDay,
  deleteDay,
  dayPhotoUpload,
} = require('../controllers/days');

const Day = require('../models/Day');

// const advancedResults = require('../middleware/advancedResults');

// Include other resourses routers
const lessonRouter = require('./lessons');

const router = express.Router();

const { protect } = require('../middleware/auth');

// Re-route into other resource routers
router.use('/:dayId/lessons', lessonRouter);

router
  .route('/')
  // .get(advancedResults(Day, 'courses'), getDays)
  .get(protect, getDays)
  .post(protect, createDay);

router
  .route('/:id')
  .get(protect, getDay)
  .put(protect, updateDay)
  .delete(protect, deleteDay);

router.route('/:id/photo').put(protect, dayPhotoUpload);

module.exports = router;
