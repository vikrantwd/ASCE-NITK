var mongoose = require('mongoose');  
var db = require('../db/db');

module.exports = {

	getFooter: function() {
		db.RecentPosts.find({}, function(err,Docs) {
			if(err){
				console.log(err);
				return 0;
			}
			console.log("************"+Docs+'***');
			return Docs;
		});
	}
}