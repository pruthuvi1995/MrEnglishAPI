const express = require('express');
const dotenv = require('dotenv');

// Routes files
const englishapp = require('./routes/englishapp');

//Load env vars

dotenv.config({ path: './config/config.env' });

const app = express();

app.use('/api/v1/users', englishapp);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
