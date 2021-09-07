const express = require('express');
const {
  getChapterDetails,
  getSingleChapterDetails,
  addChapterDetails,
  updateChapterDetails,
} = require('../controllers/chapterDetails');

const ClassDetail = require('../models/ChapterDetail');

// Include other resourses routers
// const lessonRouter = require('./days');
// const lessonRouter = require('./auth');

const router = express.Router({ mergeParams: true });

// const advancedResults = require('../middleware/advancedResults');
const { protect } = require('../middleware/auth');

router.route('/:userId').get(protect, getChapterDetails);

router.route('/:userId/:chapterId').get(
  protect,
  // advancedResults(DayDetail, {
  //   path: 'day',
  //   select: 'title',
  // }),
  getSingleChapterDetails
).post(protect, addChapterDetails);



router.route('/:id').put(protect, updateChapterDetails);

module.exports = router;
