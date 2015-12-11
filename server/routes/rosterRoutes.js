// Packages
var express = require('express');
var rosterRouter = express.Router();

var router = function() {

  rosterRouter.route('/roster')
  .get(function (req, res) {

   // To Jeff: implement query
  
  });

  return rosterRouter;
};

module.exports = router;