const express = require('express');

const {
  getChapters,
  getChapter,
  createChapter,
  updateChapter,
  deleteChapter,
//   dayPhotoUpload,
} = require('../controllers/chapters');

const Chapter = require('../models/Chapter');

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
  .get(protect, getChapters)
  .post(protect, createChapter);

router
  .route('/:id')
  .get(protect, getChapter)
  .put(protect, updateChapter)
  .delete(protect, deleteChapter);

// router.route('/:id/photo').put(protect, dayPhotoUpload);

module.exports = router;
