const express = require('express');
const {
  getClassDetails,
  getSingleClassDetails,
  addClassDetails,
  updateClassDetails,
} = require('../controllers/classDetails');

const ClassDetail = require('../models/ClassDetail');

// Include other resourses routers
// const lessonRouter = require('./days');
// const lessonRouter = require('./auth');

const router = express.Router({ mergeParams: true });

// const advancedResults = require('../middleware/advancedResults');
const { protect } = require('../middleware/auth');

router.route('/:userId').get(protect, getClassDetails);

router.route('/:userId/:classId').get(
  protect,
  // advancedResults(DayDetail, {
  //   path: 'day',
  //   select: 'title',
  // }),
  getSingleClassDetails
).post(protect, addClassDetails);



router.route('/:id').put(protect, updateClassDetails);

module.exports = router;
