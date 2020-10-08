const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

//Load env vars

dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// Routes files
const days = require('./routes/days');
const lessons = require('./routes/lessons');
const auth = require('./routes/auth');
const dayDetails = require('./routes/dayDetails');

const app = express();

// Body parser
app.use(express.json());

//Cookie Parsar
app.use(cookieParser());

// Dev logging middle ware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// File uploading
app.use(fileupload());

//Sanitize data
app.use(mongoSanitize());

//set security headers
app.use(helmet());

//Prevent XSS attacks
app.use(xss());

//rate limit
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 1000,
});
app.use(limiter);

// Prevent http params pollution
app.use(hpp());

// Enable cors
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount routers
app.use('/api/v1/days', days);
app.use('/api/v1/lessons', lessons);
app.use('/api/v1/auth', auth);
app.use('/api/v1/dayDetails', dayDetails);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
  )
);

// handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error : ${err.message}`.red);
  //Close server and exit process
  server.close(() => process.exit(1));
});
