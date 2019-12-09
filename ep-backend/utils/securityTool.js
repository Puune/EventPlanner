const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('./config');

const genPasswordhash = async (source) => {
  const saltRounds = 10;
  const pswHash = await bcrypt.hash(source, saltRounds);
  return pswHash;
}

const comparePsw = async (user, psw) => {
  const comparison = await bcrypt.compare(psw, user.passwordHash);
  return comparison;
}

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