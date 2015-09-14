var express = require('express');
var router = express.Router();
var db = require('../db/db');
var mongoose = require('mongoose');
var async = require('async');

var events,footer,relEvents;

var footerlist = function(callback){
	db.RecentPosts.find({},function(err,data){
		footer = data[0];
		callback(null,footer);
	});
}
var eventList = function(callback){
	db.EventsOppCol.find({"subpageOf" : "mainpage","page":"collaborate"},function(err,data){
		events = data[0];
		callback(null,events);
	});
}
var relatedEvents = function(callback){
	db.EventsOppCol.find({"page" : cat},function(err,data){
		relEvents = data[0];
		callback(null,relEvents);
	});
}
var cat ;
router.get('/', function(req, res, next) {
	async.series([footerlist,eventList,relatedEvents],function(err,results){
		if(!err){
			console.log(footer);
			res.render('opportunities',{ParentPage :'Main',footer: footer,events: events});
		}
	});
});
router.get('/:cat', function(req, res, next) {
	cat = req.params.cat;
	async.series([footerlist,eventList,relatedEvents],function(err,results){
		if(!err){
			if(relEvents==undefined)
			res.send('fuck 0ff');
			else
			res.render('opportunities',{ParentPage :'Main',footer: footer,events:events,focus:relEvents});
		}
	});
});

module.exports = router;