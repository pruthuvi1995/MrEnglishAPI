const mongoose = require('mongoose');

const PaperSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a paper title'],
  },
  year: {
    type: mongoose.Schema.ObjectId,
    ref: 'Year',
    required: true,
  },
  question01: {
    type: String,
    required: [true, 'Please add a Q01 url'],
  },
  question02: {
    type: String,
    required: [true, 'Please add a Q02 url'],
  },
  question03: {
    type: String,
    required: [true, 'Please add a Q03 url'],
  },
  question04: {
    type: String,
    required: [true, 'Please add a Q04 url'],
  },
  question05: {
    type: String,
    required: [true, 'Please add a Q05 url'],
  },
  question06: {
    type: String,
    required: [true, 'Please add a Q06 url'],
  },
  question07: {
    type: String,
    required: [true, 'Please add a Q07 url'],
  },
  question08: {
    type: String,
    required: [true, 'Please add a Q08 url'],
  },
  question09: {
    type: String,
    required: [true, 'Please add a Q09 url'],
  },
  question10: {
    type: String,
    required: [true, 'Please add a Q10 url'],
  },
  question11: {
    type: String,
    required: [true, 'Please add a Q11 url'],
  },
  question12: {
    type: String,
    required: [true, 'Please add a Q12 url'],
  },
  question13: {
    type: String,
    required: [true, 'Please add a Q13 url'],
  },
  question14: {
    type: String,
    required: [true, 'Please add a Q14 url'],
  },
  question15: {
    type: String,
    required: [true, 'Please add a Q15 url'],
  },
  question16: {
    type: String,
    required: [true, 'Please add a 16 url'],
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


module.exports = mongoose.model('Paper', PaperSchema);
