const config = require('./utils/config');
const http = require('http');
const app = require('./App');

const server = http.createServer(app);

server.listen(config.PORT);