const express = require('express');

const {
  getClassStudents,
  getClassStudent,
  createClassStudent,
  updateClassStudent,
  deleteClassStudent,
//   dayPhotoUpload,
} = require('../controllers/classStudents');

const ClassStudent = require('../models/ClassStudent');

// const advancedResults = require('../middleware/advancedResults');

// Include other resourses routers
// const paperRouter = require('./papers');

const router = express.Router();

const { protect } = require('../middleware/auth');

// Re-route into other resource routers
// router.use('/:yearId/papers', paperRouter);

router
  .route('/')
  // .get(advancedResults(Day, 'courses'), getDays)
  .get(protect, getClassStudents)
  .post(protect, createClassStudent);

router
  .route('/:id')
  .get(protect, getClassStudent)
  .put(protect, updateClassStudent)
  .delete(protect, deleteClassStudent);

// router.route('/:id/photo').put(protect, dayPhotoUpload);

module.exports = router;
