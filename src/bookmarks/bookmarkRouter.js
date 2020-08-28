const express = require('express');
const { v4: uuid } = require('uuid');
const { isWebUri } = require('valid-url');
const logger = require('../logger');
const bookmarks = require('../STORE');

const bookmarkRouter = express.Router();
const bodyParser = express.json();

bookmarkRouter.route('/').get((req, res) => {
  res.status(200).json('it\'s working! :-)');
});

bookmarkRouter.route('/bookmarks')
  .get((req, res) => {
    res.status(200).json(bookmarks);
})
  .post(bodyParser, (req, res) => {
    const { title, url, description = '', rating } = req.body;

    if (!title) {
      logger.error('Title is required');
      return res.json(400).send('Invalid data');
    }
    if (!description) {
      logger.error('Content is required');
      return res.json(400).send('Invalid data');
    }
    if (!isWebUri(url)) {
      logger.error(`Invalid url '${url}' supplied`)
      return res.status(400).send(`'url' must be a valid URL`)
    }
    if (!Number.isInteger(rating) || rating < 0 || rating > 5) {
      logger.error(`Invalid rating '${rating}' supplied`)
      return res.status(400).send(`'Rrating' must be a number between 0 and 5`)
    }

    const id = uuid();
    const bookmark = {
      id,
      title,
      description,
      url,
      rating
    };

    bookmarks.push(bookmark)
    logger.info(`Bookmark with ${id} created!`)
    return res.status(201).location(`http://localhost:8000/list/${id}`).json({ id });
  });

bookmarkRouter.route('/bookmarks/:id')
  .get((req, res) => {
    const { id } = req.params;
    const bookmark = bookmarks.find(book => book.id === id);

    if (!bookmark) {
      logger.error(`Bookmark with ${id} not found`);
      return res.status(404).send('Bookmark not found');
    }
    res.json(bookmark);
})

  .delete((req, res) => {
    const { id } = req.params
    const index = bookmarks.findIndex(book => book.id === id);

    if (!index === -1) {
      logger.error(`Bookmark with id ${id} not found`);
      return res.status(404).send('Not found');
    }
    bookmarks.splice(index, 1);
    logger.info(`Bookmark with id ${id} deleted`);
    res.status(204).end();
  });

module.exports = bookmarkRouter;