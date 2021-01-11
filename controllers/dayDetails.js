const DayDetail = require('../models/DayDetail');
const Day = require('../models/Day');
const User = require('../models/User');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const axios = require('axios');
const https = require('https')




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
    {$and: [{user: req.params.userId}, {day: req.params.dayId }]}
  ).populate('user').populate('day');

  if (dayDetails.length == 0) {
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
// @route   POST /api/v1/dayDetails/:userId/:dayId
// @access  Private

exports.addDayDetails = asyncHandler(async (req, res, next) => {
  req.body.user = req.params.userId;
  req.body.day = req.params.dayId;

  const dayDetails = await DayDetail.find(
    {$and: [{user: req.body.user}, {day: req.body.day }]}
  )

  if (dayDetails.length != 0) {
    return res.status(200).json({
      success: false,
      data: dayDetails,
  });}

  var dayDetail = await DayDetail.create(req.body);

  return res.status(201).json({
    success: true,
    data: dayDetail,
  });
});

// @desc    update day details
// @route   PUT /api/v1/dayDetails/id
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
    data: dayDetails,
  });
});

// @desc    Get otp
// @route   post /api/v1/dayDetails/getOtp
// @access  Private

exports.getOtp = asyncHandler(async (req, res, next) => {
  const phoneNo = req.body.phoneNo.toString;
  const data = {
    applicationId:'APP_059742',
    password: '8a6a6b5e4d4b95e97f285bd896819165',
    subscriberId: 'tel:'.concat(phoneNo),
    applicationMetaData:
      { client: 'WEBAPP',
        device: 'ANY',
        os:'ANY',
        appCode:'dd'
  }
}

  // const data_json = JSON.stringify(data);

  // const options = {
  //   hostname: 'https://api.dialog.lk',
  //   port: 443,
  //   path: '/subscription/otp/request',
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Content-Length': data_json.length
  //   }
  // }

  // const req = https.request(options, res => {
  //   console.log(`statusCode: ${res.statusCode}`)
  
  //   res.on('data', d => {
  //     process.stdout.write(d)
  //   })
  // })
  
  // req.on('error', error => {
  //   console.error(error)
  // })
  
  // req.write(data_json)
  // req.end()

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


//   var secret = 1234;
//   const userOtp = req.body.otp;
//       const expiry = speakeasy.totp.verify({
//           secret: secret.base32,
//           encoding: 'base32',
//           token: userOtp,
//           step:60,
//           window:10
// });
//       return res.status(200).json({
//         success: true,
//         data: expiry,
//       });
  });

