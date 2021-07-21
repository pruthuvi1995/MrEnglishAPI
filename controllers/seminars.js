const path = require('path');
// const Day = require('../models/Year');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Seminar = require('../models/Seminar');

// @desc    Get all Seminars
// @route   GET /api/v1/seminars
// @access  Private
exports.getSeminars = asyncHandler(async (req, res, next) => {
  const seminars = await Seminar.find();

  res.status(200).json({ success: true, count: seminars.length, data: seminars });
});

// @desc    Get single Seminar
// @route   GET /api/v1/seminars/:id
// @access  Private
exports.getSeminar = asyncHandler(async (req, res, next) => {
  const seminar = await Seminar.findById(req.params.id);

  if (!seminar) {
    return next(
      new ErrorResponse(`Resources not found with id of ${req.params.id}`)
    );
  }

  res.status(200).json({ success: true, data: seminar });
});

// @desc    Create single seminar
// @route   POST /api/v1/years
// @access  Private
exports.createSeminar = asyncHandler(async (req, res, next) => {
  const seminar = await Seminar.create(req.body);
  res.status(201).json({ success: true, msg:seminar });
});

// @desc    Update seminar
// @route   Put /api/v1/seminars/:id
// @access  Private
exports.updateSeminar = asyncHandler(async (req, res, next) => {
  const seminar = await Seminar.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!seminar) {
    return next(
      new ErrorResponse(`Resources not found with id of ${req.params.id}`)
    );
  }

  res.status(200).json({ success: true, data: seminar });
});

// @desc    Delete Seminar
// @route   DELETE /api/v1/seminars/:id
// @access  Private
exports.deleteSeminar = asyncHandler(async (req, res, next) => {
  const seminar = await Seminar.findById(req.params.id);

  if (!seminar) {
    return next(
      new ErrorResponse(`Resources not found with id of ${req.params.id}`)
    );
  }

  seminar.remove();

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
