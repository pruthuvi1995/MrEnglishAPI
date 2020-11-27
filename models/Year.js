const mongoose = require('mongoose');
const slugify = require('slugify');

const YearSchema = new mongoose.Schema(
  {
    year: {
      type: String,
      required: [true, 'Please add a year'],
      unique: true,
      trim: true,
      maxlength: [100, 'title can not be more than 100 charactors'],
    },
    slug: String,
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

// Create bootcamp slug from the name
YearSchema.pre('save', function (next) {
  this.slug = slugify(this.year, { lower: true });
  next();
});

//cascade delete lessons when a day is deleted
YearSchema.pre('remove', async function (next) {
  await this.model('Paper'.deleteMany({ year: this._id }));
  next();
});

// Reverse populate with virtuals
YearSchema.virtual('papers', {
  ref: 'Paper',
  localField: '_id',
  foreignField: 'year',
  justOne: false,
});

module.exports = mongoose.model('Year', YearSchema);
