const mongoose = require('mongoose');
const slugify = require('slugify');

const DaySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a name'],
      unique: true,
      trim: true,
      maxlength: [100, 'title can not be more than 100 charactors'],
    },
    slug: String,
    description: {
      type: String,
      required: [true, 'Please add a description'],
      maxlength: [100, 'Description can not be more than 1000 charactors'],
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
    photo: {
      type: String,
      default: 'no-photo.jpg',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    // user: {
    //   type: mongoose.Schema.ObjectId,
    //   ref: 'User',
    //   required: true,
    // },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Create bootcamp slug from the name
DaySchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

//cascade delete lessons when a day is deleted
DaySchema.pre('remove', async function (next) {
  await this.model('Course'.deleteMany({ day: this._id }));
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
