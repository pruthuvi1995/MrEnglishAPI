const Course = require('../models/Course');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all Courses
// @route   GET /api/v1/courses
// @access  Private

exports.getCourses = asyncHandler(async (req, res, next) => {
  let query = Course.find();

  const lessons = await query;

  res.status(200).json({
    success: true,
    count: lessons.length,
    data: lessons,
  });
});