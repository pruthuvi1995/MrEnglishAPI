const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        unique: true,
        maxlength: [300, 'title can not be more than 100 charactors'],
      },
      description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [2000, 'Description can not be more than 1000 charactors'],
      },
  
});


module.exports = mongoose.model('Course', CourseSchema);
