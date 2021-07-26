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
  .post( createClassStudent);

router
  .route('/:nICNo')
  .get( getClassStudent)
  .post(getClassStudents)
router
  .route('/:id')
  .put( updateClassStudent)
  .delete( deleteClassStudent);

 
;

// router.route('/:id/photo').put(protect, dayPhotoUpload);

module.exports = router;
