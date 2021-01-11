const Paper = require('../models/Paper');
const Year = require('../models/Year');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all papers
// @route   GET /api/v1/papers
// @route   GET /api/v1/years/:yearId/papers
// @access  Private

exports.getPapers = asyncHandler(async (req, res, next) => {
  let query;

  if (req.params.yearId) {
    query = Paper.find({ year: req.params.yearId });
  } else {
    query = Paper.find().populate('year');
  }

  const papers = await query;

  res.status(200).json({
    success: true,
    count: papers.length,
    data: papers,
  });
});

// @desc    Get single paper
// @route   GET /api/v1/papers/:id
// @access  Private

exports.getPaper = asyncHandler(async (req, res, next) => {
  const paper = await Paper.findById(req.params.id).populate({
    path: 'year',
    select: 'year',
  });

  if (!paper) {
    return next(
      new ErrorResponse(`no lesson with the id of ${req.params.id}`),
      404
    );
  }

  res.status(200).json({
    success: true,
    data: paper,
  });
});

// @desc    Add single paper
// @route   POST /api/v1/year/:yearId/papers
// @access  Private

exports.addPaper = asyncHandler(async (req, res, next) => {
  req.body.year = req.params.yearId;

  const year = await Year.findById(req.params.yearId);

  if (!year) {
    return next(
      new ErrorResponse(`no day with the id of ${req.params.dayId}`),
      404
    );
  }

  const paper = await Paper.create(req.body);

  res.status(200).json({
    success: true,
    data: paper,
  });
});

// @desc    Update paper
// @route   PUT /api/v1/papers/:id
// @access  Private

exports.updatePaper = asyncHandler(async (req, res, next) => {
  let paper = await Paper.findById(req.params.id);

  if (!paper) {
    return next(
      new ErrorResponse(`no lesson with the id of ${req.params.id}`),
      404
    );
  }

  paper = await Paper.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    data: paper,
  });
});

// @desc    Delete paper
// @route   DELETE /api/v1/papers/:id
// @access  Private

exports.deletePaper = asyncHandler(async (req, res, next) => {
  paper = await Paper.findById(req.params.id);

  if (!paper) {
    return next(
      new ErrorResponse(`no lesson with the id of ${req.params.id}`),
      404
    );
  }

  await paper.remove();
  res.status(200).json({
    success: true,
    data: {},
  });
});
