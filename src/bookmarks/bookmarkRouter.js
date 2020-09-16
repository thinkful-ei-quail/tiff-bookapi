const express = require('express');
const { v4: uuid } = require('uuid');
const { isWebUri } = require('valid-url');
const logger = require('../logger');
const STORE = require('../STORE');

const bookmarkRouter = express.Router();
const bodyParser = express.json();

bookmarkRouter
  .route('/')
  .get((req, res) => {
    res.status(200).json(STORE.bookmarks);
  })
  .post(bodyParser, (req, res) => {
    const { title, url, description, rating } = req.body;
    
    if (!title) {
      logger.error('Title is required');
      return res.json(400).send('Invalid data');
    }
    if (!isWebUri(url)) {
      logger.error(`Invalid url '${url}' supplied`);
      return res.status(400).send('url must be a valid URL');
    }

    const bookmark = {
      id: uuid(),
      title,
      description,
      url,
      rating
    };

    STORE.bookmarks.push(bookmark);
    logger.info(`Bookmark with ${bookmark.id} created!`);
    res.status(201).location(`http://localhost:8000/bookmarks/${bookmark.id}`).json(bookmark);
  });

bookmarkRouter
  .route('/:bookmark_id')
  .get((req, res) => {
    const { id } = req.params;
    let bookmark = STORE.bookmarks.findIndex(book => book.id === id);

    if (!bookmark) {
      logger.error(`Bookmark with ${id} not found`);
      return res.status(404).send('Bookmark not found');
    }
    return res.json(bookmark);
  })

  .delete((req, res) => {
    const { id } = req.params;
    const index = STORE.bookmarks.findIndex(book => book.id === id);

    if (!index === -1) {
      logger.error(`Bookmark with id ${id} not found`);
      return res.status(404).send('Not found');
    }
    STORE.bookmarks.splice(index, 1);
    logger.info(`Bookmark with id ${id} deleted`);
    return res.status(204).end();
  });

module.exports = bookmarkRouter;