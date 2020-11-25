const express = require('express');

const {
  getYears,
  getYear,
  createYear,
  updateYear,
  deleteYear,
//   dayPhotoUpload,
} = require('../controllers/years');

const Year = require('../models/Year');

// const advancedResults = require('../middleware/advancedResults');

// Include other resourses routers
const paperRouter = require('./papers');

const router = express.Router();

const { protect } = require('../middleware/auth');

// Re-route into other resource routers
router.use('/:yearId/papers', paperRouter);

router
  .route('/')
  // .get(advancedResults(Day, 'courses'), getDays)
  .get(protect, getYears)
  .post(protect, createYear);

router
  .route('/:id')
  .get(protect, getYear)
  .put(protect, updateYear)
  .delete(protect, deleteYear);

// router.route('/:id/photo').put(protect, dayPhotoUpload);

module.exports = router;
