
const mongoose = require('mongoose');

const ClassStudentSchema = new mongoose.Schema({
  nICNo:{
    type: String,
    required: [true, 'Please add NIC no'],
  },
  className: {
    type: String,
    required: [true, 'Please add class name'],
  },
  course: {
    type: mongoose.Schema.ObjectId,
    ref: 'Course',
    required: true,
  },
  activeClassStudent: {
    type: String,
    default: '2020-01-01',   
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});




module.exports = mongoose.model('ClassStudent', ClassStudentSchema);
