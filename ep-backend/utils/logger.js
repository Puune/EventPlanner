/**
 * This module will print logs to a terminal.
 * @module util.logger
 */

/**
 * Prints info
 * @function info
 * @param  {...any} params
 */
const info = (...params) => {
  console.log(...params);
}

/**
 * Prints errors
 * @function error
 * @param  {...any} params
 */
const error = (...params) => {
  console.error(...params)
}

module.exports = {
  info, error
}