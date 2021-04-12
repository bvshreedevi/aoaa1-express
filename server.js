var app = require('./app');
var port = process.env.PORT || 3000;

var server = app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});
/*
const express = require('express');
const http = require('http');
//const app = require('./app');
const app = express();
const port = 3000;

const server = http.createServer(app);

app.listen(port);

*/
