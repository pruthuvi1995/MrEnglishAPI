const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const ClassStudentSchema = new mongoose.Schema({
    NICNo: {
        type: String,
        required: [true, 'Please add an NICNo'],
    },
    className: {
        type: [],
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
