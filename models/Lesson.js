const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a course title'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  day: {
    type: mongoose.Schema.ObjectId,
    ref: 'Day',
    required: true,
  },

  isCompleted: {
    type: Boolean,
    default: false,
  },
  isActivated: {
    type: Boolean,
    default: false,
  },
  marks: {
    type: Number,
    min: [0, 'Marks must be at least 0'],
    max: [100, 'Marks must can not be more than 100'],
  },
  imageURL: {
    type: String,
    // match: [
    //   /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
    //   'Please use a valid URL with HTTP or HTTPS',
    // ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Lesson', LessonSchema);
