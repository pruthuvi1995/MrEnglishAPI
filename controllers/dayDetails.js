const DayDetail = require('../models/DayDetail');
const Day = require('../models/Day');
const User = require('../models/User');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all day details
// @route   GET /api/v1/dayDetails/:userId
// @access  Public

exports.getDayDetails = asyncHandler(async (req, res, next) => {
  if (req.params.userId) {
    const dayDetails = await DayDetail.find({ user: req.params.userId }).populate('user').populate('day');

    return res.status(200).json({
      success: true,
      count: dayDetails.length,
      data: dayDetails,
    });
  }
  // else {
  //   res.status(200).json(res.advancedResults);
  // }
});

// @desc    Get a single day details
// @route   GET /api/v1/dayDetails/:userId/:dayId
// @access  Private

exports.getSingleDayDetails = asyncHandler(async (req, res, next) => {
  const dayDetails = await DayDetail.find(
    { user: req.params.userId } && { day: req.params.dayId }
  ).populate('user','day');

  if (!dayDetails) {
    return next(
      new ErrorResponse(
        `No review found with the id of ${req.params.userId} and ${req.params.dayId}`,
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    data: dayDetails,
  });
});

// @desc    add day details
// @route   POST /api/v1/dayDetails/:dayId
// @access  Private

exports.addDayDetails = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.userId;
  req.body.day = req.params.dayId;

  const day = await Day.findById(req.params.dayId);

  if (!day) {
    return next(new ErrorResponse(`No day with the id`, 404));
  }

  const dayDetail = await DayDetail.create(req.body);

  return res.status(201).json({
    success: true,
    data: dayDetail,
  });
});

// @desc    update day details
// @route   PUT /api/v1/dayDetails/:id
// @access  Private

exports.updateDayDetails = asyncHandler(async (req, res, next) => {
  let dayDetails = await DayDetail.findById(req.params.id);

  if (!dayDetails) {
    return next(new ErrorResponse(`No day details  with the id`, 404));
  }

  if (dayDetails.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`Not authorized to update day details`, 401));
  }

  dayDetails = await DayDetail.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json({
    success: true,
    data: dayDetail,
  });
});
