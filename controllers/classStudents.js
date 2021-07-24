const path = require('path');
// const Day = require('../models/ClassStudent');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const ClassStudent = require('../models/ClassStudent');

// @desc    Get all class students
// @route   GET /api/v1/classStudents
// @access  Private
exports.getClassStudents = asyncHandler(async (req, res, next) => {
  const classStudents = await ClassStudent.find();

  res.status(200).json({ success: true, count: classStudents.length, data: classStudents });
});

// @desc    Get single class student
// @route   GET /api/v1/classStudents/:id
// @access  Private
exports.getClassStudent = asyncHandler(async (req, res, next) => {
  const classStudent = await ClassStudent.find({ NICNo: req.params.userId })

  if (!classStudent) {
    return next(
      new ErrorResponse(`Resources not found with id of ${req.params.id}`)
    );
  }

  res.status(200).json({ success: true, data: classStudent });
});

// @desc    Create single class Student
// @route   POST /api/v1/classStudents
// @access  Private
exports.createClassStudent = asyncHandler(async (req, res, next) => {
  const classStudent = await ClassStudent.create(req.body);
  res.status(201).json({ success: true, data:classStudent });
});

// @desc    Update class Student
// @route   Put /api/v1/classStudents/:id
// @access  Private
exports.updateClassStudent = asyncHandler(async (req, res, next) => {
  const classStudent = await ClassStudent.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!classStudent) {
    return next(
      new ErrorResponse(`Resources not found with id of ${req.params.id}`)
    );
  }

  res.status(200).json({ success: true, data: classStudent });
});

// @desc    Delete class Student
// @route   DELETE /api/v1/classStudents/:id
// @access  Private
exports.deleteClassStudent = asyncHandler(async (req, res, next) => {
  const classStudent = await ClassStudent.findById(req.params.id);

  if (!classStudent) {
    return next(
      new ErrorResponse(`Resources not found with id of ${req.params.id}`)
    );
  }

  classStudent.remove();

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
