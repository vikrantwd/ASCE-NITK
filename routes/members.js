var express = require('express');
var router = express.Router();
var db = require('../db/db');
var mongoose = require('mongoose');
var async = require('async');

var footer;

var footerlist = function(callback){
	db.RecentPosts.find({},function(err,data){
		footer = data[0];
		callback(null,footer);
	});
}

router.get('/', function(req, res, next) {
	async.series([footerlist],function(err,results){
		if(!err){
			res.render('members',{title :'Members',footer: footer});
		}
	});
});

module.exports = router;
