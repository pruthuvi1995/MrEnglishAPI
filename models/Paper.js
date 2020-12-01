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
  descriptionQ01: {
    type: String,
    required: [true, 'Please add a descriptionQ01'],
  },
  question02: {
    type: String,
    required: [true, 'Please add a Q02 url'],
  },
  descriptionQ02: {
    type: String,
    required: [true, 'Please add a descriptionQ02'],
  },
  question03: {
    type: String,
    required: [true, 'Please add a Q03 url'],
  },
  descriptionQ03: {
    type: String,
    required: [true, 'Please add a descriptionQ03'],
  },
  question04: {
    type: String,
    required: [true, 'Please add a Q04 url'],
  },
  descriptionQ04: {
    type: String,
    required: [true, 'Please add a descriptionQ04'],
  },
  question05: {
    type: String,
    required: [true, 'Please add a Q05 url'],
  },
  descriptionQ05: {
    type: String,
    required: [true, 'Please add a descriptionQ05'],
  },
  question06: {
    type: String,
    required: [true, 'Please add a Q06 url'],
  },
  descriptionQ06: {
    type: String,
    required: [true, 'Please add a descriptionQ06'],
  },
  question07: {
    type: String,
    required: [true, 'Please add a Q07 url'],
  },
  descriptionQ07: {
    type: String,
    required: [true, 'Please add a descriptionQ07'],
  },
  question08: {
    type: String,
    required: [true, 'Please add a Q08 url'],
  },
  descriptionQ08: {
    type: String,
    required: [true, 'Please add a descriptionQ08'],
  },
  question09: {
    type: String,
    required: [true, 'Please add a Q09 url'],
  },
  descriptionQ09: {
    type: String,
    required: [true, 'Please add a descriptionQ09'],
  },
  question10: {
    type: String,
    required: [true, 'Please add a Q10 url'],
  },
  descriptionQ10: {
    type: String,
    required: [true, 'Please add a descriptionQ10'],
  },
  question11: {
    type: String,
    required: [true, 'Please add a Q11 url'],
  },
  descriptionQ11: {
    type: String,
    required: [true, 'Please add a descriptionQ11'],
  },
  question12: {
    type: String,
    required: [true, 'Please add a Q12 url'],
  },
  descriptionQ12: {
    type: String,
    required: [true, 'Please add a descriptionQ12'],
  },
  question13: {
    type: String,
    required: [true, 'Please add a Q13 url'],
  },
  descriptionQ13: {
    type: String,
    required: [true, 'Please add a descriptionQ13'],
  },
  question14: {
    type: String,
    required: [true, 'Please add a Q14 url'],
  },
  descriptionQ14: {
    type: String,
    required: [true, 'Please add a descriptionQ14'],
  },
  question15: {
    type: String,
    required: [true, 'Please add a Q15 url'],
  },
  descriptionQ15: {
    type: String,
    required: [true, 'Please add a descriptionQ15'],
  },
  question16: {
    type: String,
    required: [true, 'Please add a 16 url'],
  },
  descriptionQ16: {
    type: String,
    required: [true, 'Please add a descriptionQ16'],
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


module.exports = mongoose.model('Paper', PaperSchema);
