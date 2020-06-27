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

// Import into DB
const importData = async () => {
  try {
    await Day.create(days);
    await Lesson.create(lessons);
    await User.create(users);
    console.log('Data imported.....'.green.inverse);
    process.exit;
  } catch (err) {
    console.log(err);
  }
};

// Delete DB
const deleteData = async () => {
  try {
    await Day.deleteMany();
    await Lesson.deleteMany();
    await User.deleteMany();
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
