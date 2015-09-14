var express = require('express');
var router = express.Router();
var db = require('../db/db');
var mongoose = require('mongoose');
var async = require('async');

var footer;
var mainpage;

var mainpagedata = function(callback){
	db.MainSchema.find({},function(err,docs){
	    mainpage = docs;
	    callback(null,mainpage);
	});
}

var footerlist = function(callback){
	db.RecentPosts.find({},function(err,data){
		footer = data[0];
		callback(null,footer);
	});
}

router.get('/', function(req, res, next) {
	async.series([footerlist,mainpagedata],function(err,results){
		if(!err){
			res.render('index',{title :'NITK ASCE CHAPTER',footer: footer,data:mainpage});
		}
	});
});

module.exports = router;
