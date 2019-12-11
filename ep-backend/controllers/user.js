/**
 * This module handles CRUD of users.
 * @module controller.user
*/

const userRouter = require('express').Router();
const User = require('../models/user');
const securityTool = require('../utils/securityTool');

/**
 * user GET method. Returns list of all users. Only public information is returned.
 * @function get
 * @param '/' Endpart of url
 * @param request Param that contains html request
 * @param response Param to which html response is projected
 * @param next Param that allows the use of middleware
 */
userRouter.get('/', async(request, response, next) => {
  try{
    const results = await User.find({});
    response.json(results.map((user) => user.toJSON()));

  } catch(exception){
    next(exception);
  }
})


/**
 * user CREATE method. Create a new user.
 * @function post
 * @param '/' Endpart of url
 * @param request Param that contains html request
 * @param response Param to which html response is projected
 * @param next Param that allows the use of middleware
 */
userRouter.post('/', async(request, response, next) => {
  try{
    const body = request.body;

    if(body.password.length < 5){
      response.status(400).end('password too short.');
    }

    const newUser = new User({
      username: body.username,
      name: body.name,
      passwordHash: await securityTool.genPasswordhash(body.password)
    })

    const savedUser = await newUser.save();
    response.json(savedUser.toJSON());
  } catch(exception){
    next(exception);
  }
})

//update

//delete

module.exports = userRouter;