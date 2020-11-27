const mongoose = require('mongoose');
const slugify = require('slugify');

const DaySchema = new mongoose.Schema(
  {
    
    noOfLessons: {
      type: Number,
      default: 0,
    },
    dayNo: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    amount:{
      type: String,
      required: [true, 'Please add an amount'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// // Create bootcamp slug from the name
// DaySchema.pre('save', function (next) {
//   this.slug = slugify(this.title, { lower: true });
//   next();
// });

//cascade delete lessons when a day is deleted
DaySchema.pre('remove', async function (next) {
  await this.model('Lesson'.deleteMany({ day: this._id }));
  next();
});

// Reverse populate with virtuals
DaySchema.virtual('lessons', {
  ref: 'Lesson',
  localField: '_id',
  foreignField: 'day',
  justOne: false,
});

module.exports = mongoose.model('Day', DaySchema);
