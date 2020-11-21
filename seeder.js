const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

//Load models
const Day = require('./models/Day');
const Lesson = require('./models/Lesson');
const User = require('./models/User');
const DayDetail = require('./models/DayDetail');
const Course = require('./models/Course');

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// Read JSON files
const days = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/days.json`, 'utf-8')
);

const lessons = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/lessons.json`, 'utf-8')
);

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
);

const dayDetails = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/dayDetails.json`, 'utf-8')
);

const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
  try {
    await Day.create(days);
    await Lesson.create(lessons);
    await User.create(users);
    await DayDetail.create(dayDetails);
    await Course.create(courses);
    console.log('Data imported.....'.green.inverse);
    process.exit;
  } catch (err) {
    console.error(err);
  }
};

// Delete DB
const deleteData = async () => {
  try {
    await Day.deleteMany();
    await Lesson.deleteMany();
    await User.deleteMany();
    await DayDetail.deleteMany();
    await Course.deleteMany();
    console.log('Data destroyed.....'.red.inverse);
    process.exit;
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
