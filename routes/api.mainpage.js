var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var db = require('../db/db')
/* GET users listing. */
var verify;

db.Users.find({},function(err,Docs){
    verify = Docs[0]._id;
});


router.route('/')
	.post(function(req,res){
        if(verify == req.body.uid){
    		var mainpage = new db.MainSchema();
    		mainpage.news = req.body.news,
    		mainpage.col1 = req.body.col1,
    		mainpage.col2 = req.body.col2,
    		mainpage.col3 = req.body.col3,
    		mainpage.about = req.body.about,
    		mainpage.mission = req.body.mission,
    		mainpage.vision = req.body.vision;
    		mainpage.save(function(err) {
    			if (err)
    				res.send(err);
    			res.json({ message: 'Main page Content Successfully created!' });
    		})
        }
	})
	.get(function(req, res){
		db.MainSchema.find({},function(err, docs) {
            if (err)
                res.send(err);
            res.json(docs);
        });
    });

router.route('/:page_id')
	.put(function(req, res){
        if(verify == req.body.uid){
            db.MainSchema.findById(req.params.page_id, function(err, Docs){
                if (err)
                    res.send(err);
                Docs.news = req.body.news,
    			Docs.col1 = req.body.col1,
    			Docs.col2 = req.body.col2,
    			Docs.col3 = req.body.col3,
    			Docs.about = req.body.about,
    			Docs.mission = req.body.mission,
    			Docs.vision = req.body.vision;
                Docs.save(function(err) {
                    if (err)
                        res.send(err);
                    res.json({ message: 'Doc updated!' });
                });

            });
        }
    })
    .get(function(req, res) {
        db.MainSchema.findById(req.params.page_id, function(err, Docs) {
            if (err)
                res.send(err);
            res.json(Docs);
        });
    });

module.exports = router;