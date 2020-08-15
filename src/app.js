
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
// const winston = require('winston');
const validateBearerToken = require('./validate');
const bookmarkRouter = require('./bookmarks/bookmarkRouter');

const app = express();

app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', {
  skip: () => NODE_ENV === 'test'
}));
app.use(cors());
app.use(helmet());
app.use(validateBearerToken);
  
app.use(bookmarkRouter);
  
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// const logger = winston.createLogger({
//   level: 'info',
//   format: winston.format.json(),
//   transports: [
//     new winston.transport.defaultMaxListeners({ filename: 'info.log'})
//   ]
// });

// if (NODE_ENV !== 'production') {
//   logger.add(new winston.transports.Console({
//     format: winston.format.simple()
//   }));
// }

// function errorHandler(error, req, res, next) {
//   let response;
//   if (NODE_ENV === 'production') {
//     response = { error: { message: 'server error' } };
//   } else {
//     console.error(error);
//     logger.error(error.message);
//     response = { message: error.message, error };
//   }
//   res.status(500).json(response);
// }

// errorHandler;
  
module.exports = app;