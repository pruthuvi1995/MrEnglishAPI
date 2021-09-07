const mongoose = require('mongoose');

const ChapterDetailSchema = new mongoose.Schema({

  activeChapter: {
    type: String,
    default: '2020-01-01',   
  },
  chapter: {
    type: mongoose.Schema.ObjectId,
    ref: 'Chapter',
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
});



module.exports = mongoose.model('ChapterDetail', ChapterDetailSchema);
