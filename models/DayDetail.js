const mongoose = require('mongoose');

const DayDetailSchema = new mongoose.Schema({
  
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
  totalMark: {
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
  day: {
    type: mongoose.Schema.ObjectId,
    ref: 'Day',
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
});

// //Statics method to get and save mark of lessons
// DayDetailSchema.statics.getMark = async function (dayId) {
//   const obj = await this.aggregate([
//     {
//       $match: { day: dayId },
//     },
//     {
//       $group: {
//         _id: '$day',
//         averageMark: { $avg: '$marks' },
//       },
//     },
//   ]);
//   try {
//     await this.model('Day').findByIdAndUpdate(dayId, {
//       marks: obj[0].averageMark,
//     });
//   } catch (err) {
//     console.error(err);
//   }
// };

// //call getMark after save
// LessonSchema.post('save', function () {
//   this.constructor.getMark(this.day);
// });

// //call getMark after save
// LessonSchema.pre('remove', function () {
//   this.constructor.getMark(this.day);
// });

module.exports = mongoose.model('DayDetail', DayDetailSchema);
