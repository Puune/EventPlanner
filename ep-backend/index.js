const http = require('http');
const app = require('./App');
const config = require('./utils/config')

const server = http.createServer(app);

server.listen(config.PORT);