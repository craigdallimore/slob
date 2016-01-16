'use strict';

const Server = require('node-static').Server;
const http   = require('http');

const fileServer = new Server('./dist');

http.createServer((request, response) => {

  request.addListener('end', () => {
    fileServer.serve(request, response);
  }).resume();

}).listen(8080);
