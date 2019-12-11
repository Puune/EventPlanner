/**
 * This module is middleware that handles logging.
 * @module util.middleware
 */

const logger = require('./logger');

/**
 * This sends requests to logger
 * @function requestLogger
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
const requestLogger = (request, response, next) => {
  logger.info('Method', request.method);
  logger.info('Path', request.path);
  logger.info('Body', request.body);
  logger.info('==========');
  next();
}

/**
 * This function handles few common errors
 * @function
 * @param {*} error
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if(error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  }

  next(error)
}

/**
 * This function responds to html 'uknown endpoint'
 * @function unknownEndpoint
 * @param {*} request
 * @param {*} response
 */
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'uknown endpoint' });
}


module.exports = {
  errorHandler,
  requestLogger,
  unknownEndpoint
}