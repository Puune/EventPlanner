const jwt = require('jsonwebtoken');
const securityTool = require('../utils/securityTool');
const User = require('../models/user');
const config = require('../utils/config').default.default;
const loginRouter = require('express').Router();

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

//TODO confirm cached login info from front-end

module.exports = loginRouter;