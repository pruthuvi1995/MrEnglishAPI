const Lesson = require('../models/Lesson');
const Day = require('../models/Day');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all lessons
// @route   GET /api/v1/lessons
// @route   GET /api/v1/days/:dayId/lessons
// @access  Public

exports.getLessons = asyncHandler(async (req, res, next) => {
  if (req.params.dayId) {
    const lessons = await Lesson.find({ day: req.params.dayId });

    return res.status(200).json({
      success: true,
      count: lessons.length,
      data: lessons,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc    Get single lesson
// @route   GET /api/v1/lesson/:id
// @access  Public

exports.getLesson = asyncHandler(async (req, res, next) => {
  const lesson = await Lesson.findById(req.params.id).populate({
    path: 'day',
    select: 'title',
  });

  if (!lesson) {
    return next(
      new ErrorResponse(`no lesson with the id of ${req.params.id}`),
      404
    );
  }

  res.status(200).json({
    success: true,
    data: lesson,
  });
});

// @desc    Add single lesson
// @route   GET /api/v1/day/:dayId/lessons
// @access  Private

exports.addLesson = asyncHandler(async (req, res, next) => {
  req.body.day = req.params.dayId;

  const day = await Day.findById(req.params.dayId);

  if (!day) {
    return next(
      new ErrorResponse(`no day with the id of ${req.params.dayId}`),
      404
    );
  }

  const lesson = await Lesson.create(req.body);

  res.status(200).json({
    success: true,
    data: lesson,
  });
});

// @desc    Update lesson
// @route   PUT /api/v1/lessons/:id
// @access  Private

exports.updateLesson = asyncHandler(async (req, res, next) => {
  let lesson = await Lesson.findById(req.params.id);

  if (!lesson) {
    return next(
      new ErrorResponse(`no lesson with the id of ${req.params.id}`),
      404
    );
  }

  lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    data: lesson,
  });
});

// @desc    Delete lesson
// @route   DELETE /api/v1/lessons/:id
// @access  Private

exports.deleteLesson = asyncHandler(async (req, res, next) => {
  lesson = await Lesson.findById(req.params.id);

  if (!lesson) {
    return next(
      new ErrorResponse(`no lesson with the id of ${req.params.id}`),
      404
    );
  }

  await lesson.remove();
  res.status(200).json({
    success: true,
    data: {},
  });
});
