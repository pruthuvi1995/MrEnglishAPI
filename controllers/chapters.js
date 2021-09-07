const path = require('path');

const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Chapter = require('../models/Chapter');

// @desc    Get all Chapters
// @route   GET /api/v1/chapters
// @access  Private
exports.getChapters = asyncHandler(async (req, res, next) => {
  const chapters = await Chapter.find();

  res.status(200).json({ success: true, count: chapters.length, data: chapters });
});

// @desc    Get single chapter
// @route   GET /api/v1/chapters/:id
// @access  Private
exports.getChapter = asyncHandler(async (req, res, next) => {
  const chapter = await Chapter.findById(req.params.id);

  if (!chapter) {
    return next(
      new ErrorResponse(`Resources not found with id of ${req.params.id}`)
    );
  }

  res.status(200).json({ success: true, data: chapter });
});

// @desc    Create single chapter
// @route   POST /api/v1/chapters
// @access  Private
exports.createChapter = asyncHandler(async (req, res, next) => {
  const chapter = await Chapter.create(req.body);
  res.status(201).json({ success: true, data:chapter });
});

// @desc    Update chapter
// @route   Put /api/v1/chapters/:id
// @access  Private
exports.updateChapter = asyncHandler(async (req, res, next) => {
  const chapter = await Chapter.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!chapter) {
    return next(
      new ErrorResponse(`Resources not found with id of ${req.params.id}`)
    );
  }

  res.status(200).json({ success: true, data: chapter });
});

// @desc    Delete Chapter
// @route   DELETE /api/v1/chapters/:id
// @access  Private
exports.deleteChapter = asyncHandler(async (req, res, next) => {
  const chapter = await Chapter.findById(req.params.id);

  if (!chapter) {
    return next(
      new ErrorResponse(`Resources not found with id of ${req.params.id}`)
    );
  }

  chapter.remove();

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
