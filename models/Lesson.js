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
  lesson:{
    type: String,
    required: [true, 'Please add a lesson'],
  },
  mcqTrail:{
    type: [],
    required: [true, 'Please add mcq'],
  },
  mcqLesson:{
    type: [],
    required: [true, 'Please add mcq'],
  },
  imageURL: {
    type: String,
    // match: [
    //   /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
    //   'Please use a valid URL with HTTP or HTTPS',
    // ],
  },
  videoURL: {
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

//Statics method to get mark of lessons
LessonSchema.statics.getMark = async function (dayId) {
  const obj = await this.aggregate([
    {
      $match: { day: dayId },
    },
    {
      $group: {
        _id: '$day',
        averageMark: { $avg: '$marks' },
      },
    },
  ]);
  try {
    await this.model('Day').findByIdAndUpdate(dayId, {
      marks: obj[0].averageMark,
    });
  } catch (err) {
    console.error(err);
  }
};

//call getMark after save
LessonSchema.post('save', function () {
  this.constructor.getMark(this.day);
});

//call getMark after save
LessonSchema.pre('remove', function () {
  this.constructor.getMark(this.day);
});

module.exports = mongoose.model('Lesson', LessonSchema);
