require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const bookmarkRouter = require('./bookmarks/bookmarkRouter');
const app = express();
const morganOption = (process.env.NODE_ENV === 'production') ? 'tiny' : 'common';

app.use(morgan(morganOption));
app.use(cors());
app.use(helmet());
app.use(express.json());
  
app.use(bookmarkRouter);
  
module.exports = app;