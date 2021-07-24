const express = require('express');

const {
  getClasses,
  getClass,
  createClass,
  updateClass,
  deleteClass,
//   dayPhotoUpload,
} = require('../controllers/classes');

const Class = require('../models/Class');

// const advancedResults = require('../middleware/advancedResults');

// Include other resourses routers
// const paperRouter = require('./papers');

const router = express.Router();

const { protect } = require('../middleware/auth');

// Re-route into other resource routers
// router.use('/:yearId/papers', paperRouter);

router
  .route('/')
  // .get(advancedResults(Day, 'courses'), getDays)
  .get(protect, getClasses)
  .post(protect, createClass);

router
  .route('/:id')
  .get(protect, getClass)
  .put(protect, updateClass)
  .delete(protect, deleteClass);

// router.route('/:id/photo').put(protect, dayPhotoUpload);

module.exports = router;
