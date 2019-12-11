/**
 * This file handles user's login request
 * @module controller.login
 */

const jwt = require('jsonwebtoken');
const securityTool = require('../utils/securityTool');
const User = require('../models/user');
const config = require('../utils/config');
const loginRouter = require('express').Router();

/**
 * Login POST method. Accepts user's credentials and compares them to ones in document DB.
 * After a succesfull login, token is generated, that gives user access to most HTML request to the site.
 * @function post
 * @param '/' Endpart of url
 * @param request Param that contains html request
 * @param response Param to which html response is projected
 * @param next Param that allows the use of middleware
 * @returns A Token for the user
 */
loginRouter.post('/', async(request, response, next) => {
  try{
    const body = request.body;

    const user = await User.findOne({ username: body.username });

    const isPswCorrect = (user === null)
      ? false
      : await securityTool.comparePsw(user, body.password);

    if(!user){
      return response.status(404).json({ error: 'Username not found' }).end();
    } else if(!isPswCorrect){
      return response.status(401).json({ error: 'wrong password' }).end();
    }

    const userForToken = {
      username: user.username,
      id: user._id
    }

    const token = jwt.sign(userForToken, config.SECRET);

    response.status(200).send(
      { token, username:user.username, name: user.name }
    );

  } catch(exception){
    next(exception);
  }
})

module.exports = loginRouter;