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
let response;
  let phoneNo = req.body.phoneNo.substring(1)
  let serviceProvider = req.body.serviceProvider;

  if(serviceProvider == 'Dialog'){
    const details = {
      applicationId:'APP_060148',
      password: 'efddbe453c0059fe2dcba2cbbe0478f0',
      subscriberId: 'tel:94'.concat(phoneNo),
      version: '1.0',
      action: '1',
      applicationMetaData:
        { client: 'WEBAPP',
          device: 'ANY',
          os:'ANY',
          appCode:'dd'
    }
  }
    await axios
    .post('https://api.dialog.lk/subscription/otp/request',details,{ headers: { 'Content-Type': 'application/json'} } )
    .then(res => {
      console.log(res['data']);
        response=res['data'];
    })
    .catch(error => {
      console.error(error);
    })
  }else if(serviceProvider == 'Mobitel'){
    const details = {
      applicationId:"APP_007109",
      password: "f4b08896d8855f6523d7f95e534fffca",
      subscriberId: 'tel:94'.concat(phoneNo),
      applicationMetaData:
        { client: 'WEBAPP',
          device: 'ANY',
          os:'ANY',
          appCode:'dd'
    }
  }
    await axios
    .post('https://api.mspace.lk/otp/request',details,{ headers: { 'Content-Type': 'application/json'} } )
    .then(res => {
      console.log(res['data']);
        response=res['data'];
    })
    .catch(error => {
      console.error(error);
    })
  }
 

  return res.status(200).json({
    success: true,
    data: response,
  });



});

// @desc    Varify otp
// @route   Post /api/v1/dayDetails/verify
// @access  Private

exports.verifyOtp = asyncHandler(async (req, res, next) => {
  let response;
  const referenceNo = req.body.referenceNo;
  const otp = req.body.otp;
  const serviceProvider = req.body.serviceProvider;

  if(serviceProvider == 'Dialog')
  {
    const 
    data = {
      applicationId:"APP_060148",
      password: "efddbe453c0059fe2dcba2cbbe0478f0",
      otp:otp,
      referenceNo:referenceNo,
  }
  
  
   await axios
    .post('https://api.dialog.lk/subscription/otp/verify', data, { headers: { 'Content-Type': 'application/json'} })
    .then(res => {
      console.log(res['data']);
      response=res['data'];
    })
    .catch(error => {
      console.error(error);
    })
    return res.status(200).json({
      success: true,
      data: response,
    });
  

  }else if(serviceProvider == 'Mobitel')
  {
    const 
    data = {
      applicationId:"APP_007109",
      password: "f4b08896d8855f6523d7f95e534fffca",
      otp:otp,
      referenceNo:referenceNo,
  }
  
  
   await axios
    .post('https://api.mspace.lk/otp/verify', data, { headers: { 'Content-Type': 'application/json'} })
    .then(res => {
      console.log(res['data']);
      response=res['data'];
    })
    .catch(error => {
      console.error(error);
    })
    return res.status(200).json({
      success: true,
      data: response,
    });

  }
 
  });



  // @desc    get subscription
// @route   Post /api/v1/dayDetails/getSubs
// @access  Public

exports.getSubs = asyncHandler(async (req, res, next) => {
  let response;
  const phoneNo = req.body.phoneNo;
  const serviceProvider = req.body.serviceProvider;

  if(serviceProvider == 'Dialog'){

    const data = {
      applicationId:"APP_060148",
      password: "efddbe453c0059fe2dcba2cbbe0478f0",
      subscriberId: phoneNo,
  }
  
  
    await axios
    .post('https://api.dialog.lk/subscription/getStatus', data, { headers: { 'Content-Type': 'application/json'} })
    .then(res => {
      console.log(res['data']);
      response=res['data'];
    })
    .catch(error => {
      console.error(error);
    })
    return res.status(200).json({
      success: true,
      data: response,
    });
  }else if(serviceProvider == 'Mobitel'){
    const data = {
      applicationId:"APP_007109",
      password: "f4b08896d8855f6523d7f95e534fffca",
      subscriberId: phoneNo,
  }
  
  
    await axios
    .post('https://api.mspace.lk/subscription/getStatus', data, { headers: { 'Content-Type': 'application/json'} })
    .then(res => {
      console.log(res['data']);
      response=res['data'];
    })
    .catch(error => {
      console.error(error);
    })
    return res.status(200).json({
      success: true,
      data: response,
    });
  }
 


  });

   // @desc    payMoney
// @route   Post /api/v1/dayDetails/pay
// @access  Public

exports.pay = asyncHandler(async (req, res, next) => {
  let response;
  const phoneNo = req.body.phoneNo;
  const amount = req.body.amount;
  const serviceProvider = req.body.serviceProvider;

  if(serviceProvider == 'Dialog'){
    const data = {
      applicationId:"APP_060148",
      password: "efddbe453c0059fe2dcba2cbbe0478f0",
      externalTrxId: "1234567",
      subscriberId: phoneNo,
      amount: amount,
  }
  
  
    await axios
    .post('https://api.dialog.lk/caas/direct/debit', data, { headers: { 'Content-Type': 'application/json'} })
    .then(res => {
      console.log(res['data']);
      response=res['data'];
    })
    .catch(error => {
      console.error(error);
    })
    return res.status(200).json({
      success: true,
      data: response,
    });
  
  }else if(serviceProvider == 'Mobitel'){
    const data = {
      applicationId:"APP_007109",
      password: "f4b08896d8855f6523d7f95e534fffca",
      externalTrxId: "1234567",
      subscriberId: phoneNo,
      amount: amount,
  }
  
  
    await axios
    .post('https://api.mspace.lk/caas/direct/debit', data, { headers: { 'Content-Type': 'application/json'} })
    .then(res => {
      console.log(res['data']);
      response=res['data'];
    })
    .catch(error => {
      console.error(error);
    })
    return res.status(200).json({
      success: true,
      data: response,
    });
  }
 
  

  });

