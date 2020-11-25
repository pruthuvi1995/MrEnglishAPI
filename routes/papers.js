const express = require('express');

const {
  getPapers,
  getPaper,
  addPaper,
  updatePaper,
  deletePaper,
} = require('../controllers/papers');

const Lesson = require('../models/Paper');
// const advancedResults = require('../middleware/advancedResults');

const router = express.Router({ mergeParams: true });

const { protect } = require('../middleware/auth');

router
  .route('/')
  .get(
    protect,
    // advancedResults(Lesson, {
    //   path: 'day',
    //   select: 'title',
    // }),
    getPapers
  )
  .post(protect, addPaper);
router
  .route('/:id')
  .get(protect, getPaper)
  .put(protect, updatePaper)
  .delete(protect, deletePaper);

module.exports = router;
