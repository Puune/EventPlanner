/**
 * This module contins common tools for handling security-related tasks.
 * @module util.securityTool
 */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('./config');

/**
 * This function hashes a string out of a password string submitted to it.
 * @function genPasswordhash
 * @param { String } source.
 */
const genPasswordhash = async (source) => {
  const saltRounds = 10;
  const pswHash = await bcrypt.hash(source, saltRounds);
  return pswHash;
}

/**
 * This function compares a login-submitted password to a corresponding passwordHash from database.
 * @function comparePsw
 * @param { User } user
 * @param { String } psw
 */
const comparePsw = async (user, psw) => {
  const comparison = await bcrypt.compare(psw, user.passwordHash);
  return comparison;
}

/**
 * Middleware. Tries to extract request token from all incoming requests.
 * @function passiveTokenHandler
 * @param { Request } request
 * @param { Response } response
 * @param { Next } next
 */
const passiveTokenHandler = (request, response, next) => {
  const auth = request.get('authorization');
  if(auth && auth.toLowerCase().startsWith('bearer ')){
    const token = auth.substring(7);

    const decodedToken = jwt.verify(token, config.SECRET);

    if(!token || !decodedToken){
      response.status(404).json({ error: 'token not found or invalid' }).end();
    }

    request.token = decodedToken;
    next();
  } else {
    next();
  }
}

module.exports = {
  genPasswordhash,
  comparePsw,
  passiveTokenHandler
}