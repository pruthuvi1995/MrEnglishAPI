const mongoose = require('mongoose');

const YearDetailSchema = new mongoose.Schema({

  activeYear: {
    type: String,
    default: '2020-01-01',   
  },
  year: {
    type: mongoose.Schema.ObjectId,
    ref: 'Year',
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
});



module.exports = mongoose.model('YearDetail', YearDetailSchema);
