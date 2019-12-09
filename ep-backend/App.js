const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const securityTool = require('./utils/securityTool');
const cors = require('cors');

const userRouter = require('./controllers/user');
const loginRouter = require('./controllers/login');
const occasionRouter = require('./controllers/occasion');
const invitationRouter = require('./controllers/invitation');

const app = express();
if(process.env.NODE_ENV === 'production'){
  app.use(express.static('build'));
}

async function conn() {
  logger.info(`Connecting to ${config.MONGODB_URI}`);
  try{
    await mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useFindAndModify: false })
    logger.info('DB connected succesfully');

  } catch(error){
    logger.error('Error connecting to db', error.message);
  }
}
conn()

app.use(cors());

app.use(bodyParser.json());
app.use(middleware.requestLogger);
app.use(securityTool.passiveTokenHandler);

app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/occasions', occasionRouter);
app.use('/api/invitation', invitationRouter);

app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);


module.exports = app;