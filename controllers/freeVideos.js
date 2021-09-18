const path = require('path');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const FreeVideo = require('../models/FreeVideo');

// @desc    Get all FreeVideo
// @route   GET /api/v1/freevideos
// @access  Pvt
exports.getFreeVideos = asyncHandler(async (req, res, next) => {
  const freeVideos = await FreeVideo.find();

  res.status(200).json({ success: true, count: freeVideos.length, data: freeVideos });
});

// @desc    Get single FreeVideo
// @route   GET /api/v1/freeVideos/:id
// @access  Private
exports.getFreeVideo = asyncHandler(async (req, res, next) => {
  const freeVideo = await FreeVideo.findById(req.params.id);

  if (!freeVideo) {
    return next(
      new ErrorResponse(`Resources not found with id of ${req.params.id}`)
    );
  }

  res.status(200).json({ success: true, data: freeVideo });
});

// @desc    Create single freeVideo
// @route   POST /api/v1/freeVideos
// @access  Private
exports.createFreeVideo = asyncHandler(async (req, res, next) => {
  const freeVideo = await FreeVideo.create(req.body);
  res.status(201).json({ success: true, msg:freeVideo });
});

// @desc    Update freeVideo
// @route   Put /api/v1/freeVideos/:id
// @access  Private
exports.updateFreeVideo = asyncHandler(async (req, res, next) => {
  const freeVideo = await FreeVideo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!freeVideo) {
    return next(
      new ErrorResponse(`Resources not found with id of ${req.params.id}`)
    );
  }

  res.status(200).json({ success: true, data: freeVideo });
});

// @desc    Delete freeVideo
// @route   DELETE /api/v1/freeVideos/:id
// @access  Private
exports.deleteFreeVideo = asyncHandler(async (req, res, next) => {
  const freeVideo = await FreeVideo.findById(req.params.id);

  if (!freeVideo) {
    return next(
      new ErrorResponse(`Resources not found with id of ${req.params.id}`)
    );
  }

  freeVideo.remove();

  res.status(200).json({ success: true, data: {} });
});

