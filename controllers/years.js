const path = require('path');
const Day = require('../models/Year');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Year = require('../models/Year');

// @desc    Get all Years
// @route   GET /api/v1/years
// @access  Private
exports.getYears = asyncHandler(async (req, res, next) => {
  const years = await Year.find().populate('papers');

  res.status(200).json({ success: true, count: years.length, data: years });
});

// @desc    Get single year
// @route   GET /api/v1/years/:id
// @access  Private
exports.getYear = asyncHandler(async (req, res, next) => {
  const year = await Year.findById(req.params.id);

  if (!year) {
    return next(
      new ErrorResponse(`Resources not found with id of ${req.params.id}`)
    );
  }

  res.status(200).json({ success: true, data: year });
});

// @desc    Create single year
// @route   POST /api/v1/years
// @access  Private
exports.createYear = asyncHandler(async (req, res, next) => {
  const year = await Year.create(req.body);
  res.status(201).json({ success: true, msg:year });
});

// @desc    Update year
// @route   Put /api/v1/years/:id
// @access  Private
exports.updateYear = asyncHandler(async (req, res, next) => {
  const year = await Year.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!year) {
    return next(
      new ErrorResponse(`Resources not found with id of ${req.params.id}`)
    );
  }

  res.status(200).json({ success: true, data: year });
});

// @desc    Delete Day
// @route   DELETE /api/v1/years/:id
// @access  Private
exports.deleteYear = asyncHandler(async (req, res, next) => {
  const year = await Year.findById(req.params.id);

  if (!year) {
    return next(
      new ErrorResponse(`Resources not found with id of ${req.params.id}`)
    );
  }

  year.remove();

  res.status(200).json({ success: true, data: {} });
});

// // @desc    Upload Day photo
// // @route   PUT /api/v1/days/:id/photo
// // @access  Private
// exports.dayPhotoUpload = asyncHandler(async (req, res, next) => {
//   const day = await Day.findById(req.params.id);

//   if (!day) {
//     return next(
//       new ErrorResponse(`Resources not found with id of ${req.params.id}`, 404)
//     );
//   }

//   if (!req.files) {
//     return next(new ErrorResponse(`Please upload a file`, 400));
//   }

//   const file = req.files.file;

//   //Make sure the image is a photo
//   if (!file.mimetype.startsWith('image')) {
//     return next(new ErrorResponse(`Please upload an image file`, 400));
//   }

//   //check file size
//   if (file.size > process.env.MAX_FILE_UPLOAD) {
//     return next(
//       new ErrorResponse(
//         `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
//         400
//       )
//     );
//   }

//   // create a custom file name
//   file.name = `photo_${day._id}${path.parse(file.name).ext}`;
//   file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
//     if (err) {
//       console.error(err);
//       return next(new ErrorResponse(`Problem wth file upload`, 500));
//     }

//     await Day.findByIdAndUpdate(req.params.id, { photo: file.name });

//     res.status(200).json({
//       success: true,
//       data: file.name,
//     });
//   });
// });
