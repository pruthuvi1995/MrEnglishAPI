const mongoose = require('mongoose');
const slugify = require('slugify');

const ClassSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      unique: true,
      trim: true,
      maxlength: [100, 'title can not be more than 100 charactors'],
    },
    videoList:{
        type: [],
        required: [true, 'Please add video list'],
      },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    amount:{
      type: String,
      required: [true, 'Please add an amount'],
    },
  }
);

// Create bootcamp slug from the name
ClassSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});


module.exports = mongoose.model('Class', ClassSchema);
