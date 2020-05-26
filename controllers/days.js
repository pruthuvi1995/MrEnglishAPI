// @desc    Get all Days
// @route   GET /api/v1/days
// @access  Public
exports.getDays = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Show all days' });
};

// @desc    Get single Day
// @route   GET /api/v1/days/:id
// @access  Public
exports.getDay = (req, res, next) => {
  res.status(200).json({ success: true, msg: `get day ${req.params.id}` });
};

// @desc    Create single Day
// @route   POST /api/v1/days
// @access  Private
exports.createDay = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Create new day' });
};

// @desc    Update Day
// @route   Put /api/v1/days/:id
// @access  Private
exports.updateDay = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Update the day ${req.params.id}` });
};

// @desc    Delete Day
// @route   DELETE /api/v1/days/:id
// @access  Private
exports.deleteDay = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Delete ${req.params.id}` });
};
