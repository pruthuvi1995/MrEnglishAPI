const express = require('express');
const {
  getDayDetails,
  getSingleDayDetails,
  addDayDetails,
  updateDayDetails,
  getOtp,
  verifyOtp
  // deleteSingleDayDetails,
} = require('../controllers/dayDetails');

const DayDetail = require('../models/DayDetail');

// Include other resourses routers
// const lessonRouter = require('./days');
// const lessonRouter = require('./auth');

const router = express.Router({ mergeParams: true });

// const advancedResults = require('../middleware/advancedResults');
const { protect } = require('../middleware/auth');

router.route('/:userId').get(protect, getDayDetails);

router.route('/getOtp').post(getOtp);

router.route('/verify').post(verifyOtp);

router.route('/:userId/:dayId').get(
  protect,
  // advancedResults(DayDetail, {
  //   path: 'day',
  //   select: 'title',
  // }),
  getSingleDayDetails
).post(protect, addDayDetails);


router.route('/:id').put(protect, updateDayDetails);

module.exports = router;
