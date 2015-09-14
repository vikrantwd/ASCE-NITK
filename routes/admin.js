var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var db = require('../db/db')
var footer;
db.RecentPosts.find({}, function(err,Docs){
	footer = Docs[0];
});

router.get('/', function(req, res, next) {
  res.render('adminportal', { title: 'ASCE Events' ,footer:footer});
});

module.exports = router;
