const mongoose = require('mongoose');
const slugify = require('slugify');

const ChapterSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      unique: true,
      trim: true,
      maxlength: [100, 'title can not be more than 100 charactors'],
    },
    slug: String,
    chapterNo: {
        type: Number,
        default: 0,
      },
    points:{
        type: [],
        required: [true, 'Please add points list'],
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
ChapterSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});


module.exports = mongoose.model('Chapter', ChapterSchema);
