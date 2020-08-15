const { API_TOKEN } = require('./config');
// const logger = require('./logger');

function validateBearerToken(req, res, next) {
  const authMethod = req.get('Authorization');

  if (!authMethod || !authMethod.toLowerCase().startsWith("bearer ") || authMethod.substring(7).trim() !== API_TOKEN) {
    res.status(401).json({ error: 'Unauthorized access, please provide proper authentication' });
  } 
  next();
}

module.exports = validateBearerToken;