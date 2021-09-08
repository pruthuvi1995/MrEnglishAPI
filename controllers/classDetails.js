const ClassDetail = require('../models/ClassDetail');
const Class = require('../models/Class');
const User = require('../models/User');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const axios = require('axios');
// const otplib = require("otplib");
// var speakeasy = require("speakeasy");


// @desc    Get all class details
// @route   GET /api/v1/classDetails/:userId
// @access  Private

exports.getClassDetails = asyncHandler(async (req, res, next) => {
  if (req.params.userId) {
    const classDetails = await ClassDetail.find({ user: req.params.userId }).populate('user').populate('class');
    return res.status(200).json({
      success: true,
      count: classDetails.length,
      data: classDetails,
    });
  }
  // else {
  //   res.status(200).json(res.advancedResults);
  // }
});

// @desc    Get a single class details
// @route   GET /api/v1/classDetails/:userId/:classId
// @access  Private

exports.getSingleClassDetails = asyncHandler(async (req, res, next) => {
  const classDetails = await ClassDetail.find(
    {$and: [{user: req.params.userId}, {seminar: req.params.classId }]}
  ).populate('user').populate('class');

  if (classDetails.length == 0) {
    return next(
      new ErrorResponse(
        `No review found with the id of ${req.params.userId} and ${req.params.classId}`,
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    data: classDetails,
  });
});

// @desc    add class details
// @route   POST /api/v1/classDetails/:classId
// @access  Private

exports.addClassDetails = asyncHandler(async (req, res, next) => {
  req.body.user = req.params.userId;
  req.body.class = req.params.classId;

  const classDetails = await ClassDetail.find( {$and: [{user: req.body.user}, {class: req.body.class }]});

  if (classDetails.length != 0) {
    return res.status(200).json({
      success: false,
      data: classDetails,
    });}

  var classDetail = await ClassDetail.create(req.body);

  return res.status(201).json({
    success: true,
    data: classDetail,
  });
});

// @desc    update class details
// @route   PUT /api/v1/classDetails/id
// @access  Private

exports.updateClassDetails = asyncHandler(async (req, res, next) => {
  let classDetails = await ClassDetail.findById(req.params.id);

  if (!classDetails) {
    return next(new ErrorResponse(`No class details  with the id`, 404));
  }

  if (classDetails.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`Not authorized to update class details`, 401));
  }

  classDetails = await ClassDetail.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json({
    success: true,
    data: classDetails,
  });
});

