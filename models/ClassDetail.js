const mongoose = require('mongoose');

const ClassDetailSchema = new mongoose.Schema({

  activeClass: {
    type: String,
    default: '2020-01-01',   
  },
  class: {
    type: mongoose.Schema.ObjectId,
    ref: 'Class',
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
});



module.exports = mongoose.model('ClassDetail', ClassDetailSchema);
