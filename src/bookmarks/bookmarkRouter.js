const express = require('express');
const uuid = require('uuid/v4');
const logger = require('../logger');
const STORE = require('../STORE');

const bookmarkRouter = express.Router();
const bodyParser = express.json();

bookmarkRouter.route('/bookmarks').get((req, res) => {
  res.json(STORE.bookmarks);
})
  .post(bodyParser, (req, res) => {
    for (const field of ['title', 'url', 'rating']) {
      if (!req.body[field]) {
        logger.error(`${field} is required`);
        return res.status(400).send(`'${field}' is required`);
      }
    }
    const { title, url, description, rating } = req.body;

    if (!Number.isInteger(rating) || rating < 0 || rating > 5) {
      logger.error(`Invalid rating '${rating}' supplied`);
      return res.status(400).send('rating must be a number between 0 and 5');
    }
    const bookmark = { id: uuid(), title, url, description, rating };
    const { bookmark_id } = req.params;
    STORE.bookmarks.push(bookmark);

    logger.info(`Bookmark with ${bookmark_id} id created`);
    return res.status(201).json(bookmark);
  });

bookmarkRouter.route('bookmarks/:bookmark_id').get((req, res) => {
  const { bookmark_id } = req.params;
  const bookmark = STORE.bookmarks.find(book => book.id === bookmark_id);
    
  if (!bookmark) {
    logger.error(`Bookmark id:${bookmark_id} not found. :'-(`);
    return res.status(404).send('Bookmark not found');
  }
  res.json(bookmark);
})
  .delete((req, res) => {
    const { bookmark_id } = req.params;
    const bookmarkIndex = STORE.bookmarks.findIndex(book => book.id === bookmark_id);

    if (bookmarkIndex === -1) {
      logger.error(`Bookmark id:${bookmark_id} not found :-/.`);
    }

    STORE.bookmarks.splice(bookmarkIndex, 1);
    logger.info(`Bookmark id:${bookmark_id} deleted :-)`);
    return res.status(204).end();
  });

module.exports = bookmarkRouter;
