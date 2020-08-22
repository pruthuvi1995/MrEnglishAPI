const dayDetail = require('../models/DayDetail');
const ErrorResponse = require('../utils/errorResponse');

// @desc    get day details of user
// @route   GET /api/v1/dayDetails/:userId
// @access  Private
exports.getDayDetails = async (req, res, next) => {
  try {
    const dayDetails = await dayDetail.findById(req.param.userId);

    res.status(200).json({ success: true, data: dayDetails });
  } catch (err) {
    res.status(200).json({ success: false });
  }
};

// @desc    get day details of user
// @route   GET /api/v1/dayDetails/:userId/:dayId
// @access  Private
exports.getSingleDayDetails = async (req, res, next) => {
  try {
    const dayDetail = await dayDetail.findById(req.param.userId);

    if (!dayDetail) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: dayDetail });
  } catch (err) {
    // res.status(200).json({ success: false });
    next(new ErrorResponse(`Day details are not found with id of `));
  }
};

// @desc    Creating a single day details
// @route   POST /api/v1/dayDetails/:userId/:dayId
// @access  Private
exports.createDayDetails = async (req, res, next) => {
  try {
    const datDetail = await DayDetail.create(req.body);

    res.status(201).json({
      success: true,
      data: dayDetail,
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc    update day details of user
// @route   PUT /api/v1/dayDetails/:userId/:dayId
// @access  Private
exports.updateSingleDayDetails = async (req, res, next) => {
  try {
    const dayDetail = await dayDetail.findByIdAndUpdate(
      req.param.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!dayDetail) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: dayDetail });
  } catch (err) {
    res.status(200).json({ success: false });
  }
};

// @desc    delete day details of user
// @route   DELETE /api/v1/dayDetails/:userId/:dayId
// @access  Private
exports.deleteSingleDayDetails = async (req, res, next) => {
  try {
    const dayDetail = await dayDetail.findByIdAndDelete(req.param.id);

    if (!dayDetail) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(200).json({ success: false });
  }
};
