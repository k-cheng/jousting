// packages
var express = require('express');
var mongoose = require('mongoose');

// mongoose.connect();

var app = express();

var port = 8000;

// serve static files
app.use(express.static('public'));

// route test 
app.get('/', function(req, res) {
  res.send('Hello World');
});

app.listen(port, function(err) {
  console.log('running server on port over ' + port + "!!!!");
});