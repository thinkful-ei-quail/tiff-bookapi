require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
// const validateBearerToken = require('./validate');
const errorHandler = require('./error-handler');
const bookmarkRouter = require('./bookmarks/bookmarkRouter');
const morganOption = (process.env.NODE_ENV === 'production') ? 'tiny' : 'common';


const app = express();

app.use(morgan(morganOption));
app.use(cors());
app.use(helmet());
// app.use(validateBearerToken);
  
app.use(bookmarkRouter);

app.use(errorHandler);
  
module.exports = app;