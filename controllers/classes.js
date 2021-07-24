const path = require('path');
// const Day = require('../models/Year');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Class = require('../models/Class');

// @desc    Get all Classes
// @route   GET /api/v1/classes
// @access  Private
exports.getClasses = asyncHandler(async (req, res, next) => {
  const classes = await Class.find();

  res.status(200).json({ success: true, count: classes.length, data: classes });
});

// @desc    Get single Class
// @route   GET /api/v1/classes/:id
// @access  Private
exports.getClass = asyncHandler(async (req, res, next) => {
  const oneClass = await Class.findById(req.params.id);

  if (!oneClass) {
    return next(
      new ErrorResponse(`Resources not found with id of ${req.params.id}`)
    );
  }

  res.status(200).json({ success: true, data: oneClass });
});

// @desc    Create single class
// @route   POST /api/v1/classes
// @access  Private
exports.createClass = asyncHandler(async (req, res, next) => {
  const oneClass = await Class.create(req.body);
  res.status(201).json({ success: true, msg:oneClass });
});

// @desc    Update class
// @route   Put /api/v1/classes/:id
// @access  Private
exports.updateClass = asyncHandler(async (req, res, next) => {
  const oneClass = await Class.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!oneClass) {
    return next(
      new ErrorResponse(`Resources not found with id of ${req.params.id}`)
    );
  }

  res.status(200).json({ success: true, data: oneClass });
});

// @desc    Delete Class
// @route   DELETE /api/v1/classes/:id
// @access  Private
exports.deleteClass = asyncHandler(async (req, res, next) => {
  const oneClass = await Class.findById(req.params.id);

  if (!oneClass) {
    return next(
      new ErrorResponse(`Resources not found with id of ${req.params.id}`)
    );
  }

  oneClass.remove();

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
