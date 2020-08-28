const logger = require('./logger');
const API_TOKEN = require('./config');

function validateBearerToken(req, res, next) {
  const authMethod = req.get('Authorization');

  if (API_TOKEN !== authMethod) {
    logger.error(`Unauthorized request to path: ${req.path}`);
    return res.status(401).json({ error: 'Unauthorized request' });
  }
  next();
}

module.exports = validateBearerToken;