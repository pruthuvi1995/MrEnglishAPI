const ChapterDetail = require('../models/ChapterDetail');
const Chapter = require('../models/Chapter');
const User = require('../models/User');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const axios = require('axios');
// const otplib = require("otplib");
// var speakeasy = require("speakeasy");


// @desc    Get all chapter details
// @route   GET /api/v1/chapterDetails/:userId
// @access  Private

exports.getChapterDetails = asyncHandler(async (req, res, next) => {
  if (req.params.userId) {
    const chapterDetails = await ChapterDetail.find({ user: req.params.userId }).populate('user').populate('chapter');
    return res.status(200).json({
      success: true,
      count: chapterDetails.length,
      data: chapterDetails,
    });
  }
  // else {
  //   res.status(200).json(res.advancedResults);
  // }
});

// @desc    Get a single chapter details
// @route   GET /api/v1/chapterDetails/:userId/:chapterId
// @access  Private

exports.getSingleChapterDetails = asyncHandler(async (req, res, next) => {
  const chapterDetails = await chapterDetail.find(
    {$and: [{user: req.params.userId}, {chapter: req.params.chapterId }]}
  ).populate('user').populate('chapter');

  if (chapterDetails.length == 0) {
    return next(
      new ErrorResponse(
        `No review found with the id of ${req.params.userId} and ${req.params.chapterId}`,
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    data: chapterDetails,
  });
});

// @desc    add chapter details
// @route   POST /api/v1/chapterDetails/:chapterId
// @access  Private

exports.addChapterDetails = asyncHandler(async (req, res, next) => {
  req.body.user = req.params.userId;
  req.body.chapter = req.params.chapterId;

  const chapterDetails = await ChapterDetail.find( {$and: [{user: req.body.user}, {chapter: req.body.chapter }]});

  if (chapterDetails.length != 0) {
    return res.status(200).json({
      success: false,
      data: chapterDetails,
    });}

  var chapterDetail = await ChapterDetail.create(req.body);

  return res.status(201).json({
    success: true,
    data: chapterDetail,
  });
});

// @desc    update chapter details
// @route   PUT /api/v1/chapterDetails/id
// @access  Private

exports.updateChapterDetails = asyncHandler(async (req, res, next) => {
  let chapterDetails = await ChapterDetail.findById(req.params.id);

  if (!chapterDetails) {
    return next(new ErrorResponse(`No chapter details  with the id`, 404));
  }

  if (chapterDetails.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`Not authorized to update chapter details`, 401));
  }

  chapterDetails = await ChapterDetail.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json({
    success: true,
    data: chapterDetails,
  });
});

