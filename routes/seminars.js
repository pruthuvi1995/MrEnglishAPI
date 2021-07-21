const express = require('express');

const {
  getSeminars,
  getSeminar,
  createSeminar,
  updateSeminar,
  deleteSeminar,
//   dayPhotoUpload,
} = require('../controllers/seminars');

const Seminar = require('../models/Seminar');

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
  .get(protect, getSeminars)
  .post(protect, createSeminar);

router
  .route('/:id')
  .get(protect, getSeminar)
  .put(protect, updateSeminar)
  .delete(protect, deleteSeminar);

// router.route('/:id/photo').put(protect, dayPhotoUpload);

module.exports = router;
