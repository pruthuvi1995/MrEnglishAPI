const mongoose = require('mongoose');

const DayDetailSchema = new mongoose.Schema({
  totalMark: {
    type: Number,
    default: 0,
  },
  dayPaperMark: {
    type: Number,
    default: 0,
  },
  lesson1Mark: {
    type: Number,
    default: 0,
  },
  lesson2Mark: {
    type: Number,
    default: 0,
  },
  lesson3Mark: {
    type: Number,
    default: 0,
  },
  isCompletedLesson1: {
    type: Boolean,
    default: false,
  },
  isCompletedLesson2: {
    type: Boolean,
    default: false,
  },
  isCompletedLesson3: {
    type: Boolean,
    default: false,
  },
  isCompletedDay: {
    type: Boolean,
    default: false,
  },
  isCompletedDayPaper: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Daydetail', DayDetailSchema);
