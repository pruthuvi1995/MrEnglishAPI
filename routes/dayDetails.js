const express = require('express');
const {
  getDayDetails,
  getSingleDayDetails,
  addDayDetails,
  updateDayDetails,
  // deleteSingleDayDetails,
} = require('../controllers/dayDetails');

const DayDetail = require('../models/DayDetail');

const router = express.Router({ mergeParams: true });

// const advancedResults = require('../middleware/advancedResults');
const { protect } = require('../middleware/auth');

router.route('/:userId').get(protect, getDayDetails);

router.route('/:userId/:dayId').get(
  protect,
  // advancedResults(DayDetail, {
  //   path: 'day',
  //   select: 'title',
  // }),
  getSingleDayDetails
);

router.route('/:dayId').post(protect, addDayDetails);

router.route('/:id').post(protect, updateDayDetails);

module.exports = router;
