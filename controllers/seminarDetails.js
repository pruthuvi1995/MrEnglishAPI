const SeminarDetail = require('../models/SeminarDetail');
const Seminar = require('../models/Seminar');
const User = require('../models/User');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const axios = require('axios');
// const otplib = require("otplib");
// var speakeasy = require("speakeasy");


// @desc    Get all seminar details
// @route   GET /api/v1/seminarDetails/:userId
// @access  Private

exports.getSeminarDetails = asyncHandler(async (req, res, next) => {
  if (req.params.userId) {
    const seminarDetails = await SeminarDetail.find({ user: req.params.userId }).populate('user').populate('seminar');
    return res.status(200).json({
      success: true,
      count: seminarDetails.length,
      data: seminarDetails,
    });
  }
  // else {
  //   res.status(200).json(res.advancedResults);
  // }
});

// @desc    Get a single seminar details
// @route   GET /api/v1/seminarDetails/:userId/:seminarId
// @access  Private

exports.getSingleSeminarDetails = asyncHandler(async (req, res, next) => {
  const seminarDetails = await SeminarDetail.find(
    {$and: [{user: req.params.userId}, {seminar: req.params.seminarId }]}
  ).populate('user').populate('seminar');

  if (seminarDetails.length == 0) {
    return next(
      new ErrorResponse(
        `No review found with the id of ${req.params.userId} and ${req.params.seminarId}`,
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    data: seminarDetails,
  });
});

// @desc    add seminar details
// @route   POST /api/v1/seminarDetails/:seminarId
// @access  Private

exports.addSeminarDetails = asyncHandler(async (req, res, next) => {
  req.body.user = req.params.userId;
  req.body.seminar = req.params.seminarId;

  const seminarDetails = await SeminarDetail.find( {$and: [{user: req.body.user}, {seminar: req.body.seminar }]});

  if (seminarDetails.length != 0) {
    return res.status(200).json({
      success: false,
      data: seminarDetails,
    });}

  var seminarDetail = await SeminarDetail.create(req.body);

  return res.status(201).json({
    success: true,
    data: seminarDetail,
  });
});

// @desc    update seminar details
// @route   PUT /api/v1/seminarDetails/id
// @access  Private

exports.updateSeminarDetails = asyncHandler(async (req, res, next) => {
  let seminarDetails = await SeminarDetail.findById(req.params.id);

  if (!seminarDetails) {
    return next(new ErrorResponse(`No seminar details  with the id`, 404));
  }

  if (seminarDetails.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`Not authorized to update seminar details`, 401));
  }

  seminarDetails = await SeminarDetail.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json({
    success: true,
    data: seminarDetails,
  });
});

