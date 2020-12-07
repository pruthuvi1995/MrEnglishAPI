const YearDetail = require('../models/YearDetail');
const Year = require('../models/Year');
const User = require('../models/User');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const axios = require('axios');
// const otplib = require("otplib");
// var speakeasy = require("speakeasy");


// @desc    Get all year details
// @route   GET /api/v1/yearDetails/:userId
// @access  Private

exports.getYearDetails = asyncHandler(async (req, res, next) => {
  if (req.params.userId) {
    const yearDetails = await YearDetail.find({ user: req.params.userId }).populate('user').populate('year');
    return res.status(200).json({
      success: true,
      count: yearDetails.length,
      data: yearDetails,
    });
  }
  // else {
  //   res.status(200).json(res.advancedResults);
  // }
});

// @desc    Get a single year details
// @route   GET /api/v1/yearDetails/:userId/:yearId
// @access  Private

exports.getSingleYearDetails = asyncHandler(async (req, res, next) => {
  const yearDetails = await YearDetail.find(
    {$and: [{user: req.params.userId}, {day: req.params.dayId }]}
  ).populate('user').populate('year');

  if (yearDetails.length == 0) {
    return next(
      new ErrorResponse(
        `No review found with the id of ${req.params.userId} and ${req.params.yearId}`,
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    data: yearDetails,
  });
});

// @desc    add year details
// @route   POST /api/v1/yearDetails/:yearId
// @access  Private

exports.addYearDetails = asyncHandler(async (req, res, next) => {
  req.body.user = req.params.userId;
  req.body.year = req.params.yearId;

  const yearDetails = await Year.find( {$and: [{user: req.body.user}, {day: req.body.day }]});

  if (yearDetails.length != 0) {
    return res.status(200).json({
      success: false,
      data: yearDetails,
    });}

  var yearDetail = await YearDetail.create(req.body);

  return res.status(201).json({
    success: true,
    data: yearDetail,
  });
});

// @desc    update year details
// @route   PUT /api/v1/yearDetails/id
// @access  Private

exports.updateYearDetails = asyncHandler(async (req, res, next) => {
  let yearDetails = await YearDetail.findById(req.params.id);

  if (!yearDetails) {
    return next(new ErrorResponse(`No year details  with the id`, 404));
  }

  if (yearDetails.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`Not authorized to update year details`, 401));
  }

  yearDetails = await YearDetail.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json({
    success: true,
    data: yearDetails,
  });
});

// @desc    Get otp
// @route   post /api/v1/dayDetails/getOtp
// @access  Private

exports.getOtp = asyncHandler(async (req, res, next) => {
  const phoneNo = req.body.phoneNo;
  const data = {
    applicationId:"APP_059742",
    password: "8a6a6b5e4d4b95e97f285bd896819165",
    subscriberId: "tel:".concat(phoneNo),
    applicationMetaData:
      { client: "WEBAPP",
        device: "ANY",
        os:"ANY",
        appCode:"dd"
  }
}

  // const data_json = JSON.stringify(data);

  axios
  .post('https://api.dialog.lk/subscription/otp/request', data)
  .then(res => {
    return res.status(200).json({
      success: true,
      data: res,
    });
  })
  .catch(error => {
    console.error(error);
  })


});

// @desc    Varify otp
// @route   Post /api/v1/dayDetails/verify
// @access  Private

exports.verifyOtp = asyncHandler(async (req, res, next) => {

  const referenceNo = req.body.referenceNo;
  const otp = req.body.otp;
  const 
  data = {
    applicationId:"APP_059742",
    password: "8a6a6b5e4d4b95e97f285bd896819165",
    referenceNo:referenceNo,
    otp:otp
}

  // const data_json = JSON.stringify(data);

  axios
  .post('https://api.dialog.lk/subscription/otp/verify', data)
  .then(res => {
    return res.status(200).json({
      success: true,
      data: res,
    });
  })
  .catch(error => {
    console.error(error);
  })

  });

