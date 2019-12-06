const userRouter = require('express').Router();
const User = require('../models/user');
const securityTool = require('../utils/securityTool');

//get all
userRouter.get('/', async(request, response, next) => {
  try{
    const results = await User.find({});
    response.json(results.map((user) => user.toJSON()));

  } catch(exception){
    next(exception);
  }
})

//get one

//post
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