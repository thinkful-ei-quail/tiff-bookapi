const logger = require('./logger');

function validateBearerToken(req, res, next) {
  const apiKey = process.env.API_KEY;
  const authToken = req.get('Authorization');
  logger.error('Unauthorized access');

  if (!authToken || authToken.split(' ')[1] !== apiKey) {
    return res.status(401).json({ error: 'Unauthorized request' });
  }
  next();
}

module.exports = validateBearerToken;