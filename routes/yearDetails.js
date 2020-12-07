const express = require('express');
const {
  getYearDetails,
  getSingleYearDetails,
  addYearDetails,
  updateYearDetails,
} = require('../controllers/yearDetails');

const DayDetail = require('../models/YearDetail');

// Include other resourses routers
// const lessonRouter = require('./days');
// const lessonRouter = require('./auth');

const router = express.Router({ mergeParams: true });

// const advancedResults = require('../middleware/advancedResults');
const { protect } = require('../middleware/auth');

router.route('/:userId').get(protect, getYearDetails);

router.route('/:userId/:yearId').get(
  protect,
  // advancedResults(DayDetail, {
  //   path: 'day',
  //   select: 'title',
  // }),
  getSingleYearDetails
).post(protect, addYearDetails);



router.route('/:id').put(protect, updateYearDetails);

module.exports = router;
