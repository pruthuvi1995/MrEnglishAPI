const express = require('express');

const {
  getFreeVideos,
  getFreeVideo,
  createFreeVideo,
  updateFreeVideo,
  deleteFreeVideo,
//   dayPhotoUpload,
} = require('../controllers/freeVideos');

// const Seminar = require('../models/Seminar');

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
  .get(protect, getFreeVideos)
  .post(protect, createFreeVideo);

router
  .route('/:id')
  .get(protect, getFreeVideo)
  .put(protect, updateFreeVideo)
  .delete(protect, deleteFreeVideo);

// router.route('/:id/photo').put(protect, dayPhotoUpload);

module.exports = router;
