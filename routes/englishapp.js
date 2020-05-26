const express = require('express');

const {
  getDays,
  getDay,
  createDay,
  updateDay,
  deleteDay,
} = require('../controllers/days');

const router = express.Router();

router.route('/').get(getDays).post(createDay);

router.route('/:id').get(getDay).put(updateDay).delete(deleteDay);

module.exports = router;
