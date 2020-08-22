const express = require('express');
const {
  getDayDetails,
  getSingleDayDetails,
  createDayDetails,
  updateSingleDayDetails,
  deleteSingleDayDetails,
} = require('../controllers/dayDetails');

const router = express.Router();

router.route('/:userId').get(getDayDetails);
router.route('/').post(createDayDetails);
router
  .route('/:userId/:dayId')
  .post(createDayDetails)
  .get(getSingleDayDetails)
  .put(updateSingleDayDetails)
  .delete(deleteSingleDayDetails);
module.exports = router;
