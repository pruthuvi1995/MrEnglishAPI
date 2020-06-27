const path = require('path');
const Day = require('../models/Day');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all Days
// @route   GET /api/v1/days
// @access  Public
exports.getDays = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get single Day
// @route   GET /api/v1/days/:id
// @access  Public
exports.getDay = asyncHandler(async (req, res, next) => {
  const day = await Day.findById(req.params.id);

  if (!day) {
    return next(
      new ErrorResponse(`Resources not found with id of ${req.params.id}`)
    );
  }

  res.status(200).json({ success: true, data: day });
});

// @desc    Create single Day
// @route   POST /api/v1/days
// @access  Private
exports.createDay = asyncHandler(async (req, res, next) => {
  //Add user to req.body
  req.body.user = req.user.id;

  const day = await Day.create(req.body);
  res.status(201).json({ success: true, msg: day });
});

// @desc    Update Day
// @route   Put /api/v1/days/:id
// @access  Private
exports.updateDay = asyncHandler(async (req, res, next) => {
  const day = await Day.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!day) {
    return next(
      new ErrorResponse(`Resources not found with id of ${req.params.id}`)
    );
  }

  res.status(200).json({ success: true, data: day });
});

// @desc    Delete Day
// @route   DELETE /api/v1/days/:id
// @access  Private
exports.deleteDay = asyncHandler(async (req, res, next) => {
  const day = await Day.findById(req.params.id);

  if (!day) {
    return next(
      new ErrorResponse(`Resources not found with id of ${req.params.id}`)
    );
  }

  day.remove();

  res.status(200).json({ success: true, data: {} });
});

// @desc    Upload Day
// @route   PUT /api/v1/days/:id/photo
// @access  Private
exports.dayPhotoUpload = asyncHandler(async (req, res, next) => {
  const day = await Day.findById(req.params.id);

  if (!day) {
    return next(
      new ErrorResponse(`Resources not found with id of ${req.params.id}`, 404)
    );
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const file = req.files.file;

  //Make sure the image is a photo
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  //check file size
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  // create a custom file name
  file.name = `photo_${day._id}${path.parse(file.name).ext}`;
  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem wth file upload`, 500));
    }

    await Day.findByIdAndUpdate(req.params.id, { photo: file.name });

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});
