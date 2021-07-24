const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const ClassStudentSchema = new mongoose.Schema({
  classStudentName: {
    type: String,
    required: [true, 'Please add class student name'],
    unique:true,
  },
  nICNo:{
    type: String,
    required: [true, 'Please add NIC name'],
  },
  className: {
    type: String,
    required: [true, 'Please add class name'],
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
