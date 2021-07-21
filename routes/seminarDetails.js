const express = require('express');
const {
  getSeminarDetails,
  getSingleSeminarDetails,
  addSeminarDetails,
  updateSeminarDetails,
} = require('../controllers/seminarDetails');

const DayDetail = require('../models/SeminarDetail');

// Include other resourses routers
// const lessonRouter = require('./days');
// const lessonRouter = require('./auth');

const router = express.Router({ mergeParams: true });

// const advancedResults = require('../middleware/advancedResults');
const { protect } = require('../middleware/auth');

router.route('/:userId').get(protect, getSeminarDetails);

router.route('/:userId/:seminarId').get(
  protect,
  // advancedResults(DayDetail, {
  //   path: 'day',
  //   select: 'title',
  // }),
  getSingleSeminarDetails
).post(protect, addSeminarDetails);



router.route('/:id').put(protect, updateSeminarDetails);

module.exports = router;
