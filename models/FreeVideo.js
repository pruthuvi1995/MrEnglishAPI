const mongoose = require('mongoose');
const slugify = require('slugify');

const FreeVideoSchema = new mongoose.Schema(
  {

    imageList:{
        type: [],
        required: [true, 'Please add image list'],
      },
      playList:{
        type: [],
        required: [true, 'Please add play list'],
      },
   
   
    createdAt: {
      type: Date,
      default: Date.now,
    },

  }
);


module.exports = mongoose.model('FreeVideos', FreeVideoSchema);
