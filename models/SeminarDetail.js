const mongoose = require('mongoose');

const SeminarDetailSchema = new mongoose.Schema({

  activeSeminar: {
    type: String,
    default: '2020-01-01',   
  },
  seminar: {
    type: mongoose.Schema.ObjectId,
    ref: 'Seminar',
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
});



module.exports = mongoose.model('SeminarDetail', SeminarDetailSchema);
