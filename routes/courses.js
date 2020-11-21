const express = require('express');

const {
  getCourses,
} = require('../controllers/courses');

const Lesson = require('../models/Course');
// const advancedResults = require('../middleware/advancedResults');

const router = express.Router({ mergeParams: true });

const { protect } = require('../middleware/auth');

router
  .route('/')
  .get(
    protect,
    getCourses
  );

module.exports = router;
