const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
// Routes files
const englishapp = require('./routes/englishapp');

//Load env vars

dotenv.config({ path: './config/config.env' });

const app = express();

// Dev logging middle ware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/days', englishapp);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
