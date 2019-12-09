require('dotenv').config();

let MONGODB_URI;
if(process.env.NODE_ENV === 'test'){
  MONGODB_URI = process.env.MONGODB_URI_TEST;
} else if(process.env.NODE_ENV === 'heroku'){
  MONGODB_URI = 'mongodb+srv://fullstack:verySecure@cluster0-d8aqo.mongodb.net/event-planner?retryWrites=true&w=majority'
} else {
  MONGODB_URI = process.env.MONGODB_URI;
}

const PORT = process.env.PORT;

const SECRET = process.env.SECRET;

module.exports = {
  MONGODB_URI,
  PORT,
  SECRET
}