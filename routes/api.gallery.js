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
    		var Gallery = new db.Gallery();
    		Gallery.pics = req.body;
    		Gallery.save(function(err) {
    			if (err)
    				res.send(err);
    			res.json({ message: 'Gallery List Successfully created!' });
    		});
        }
	})
	.get(function(req, res) {
		db.Gallery.find({},function(err, docs) {
            if (err)
                res.send(err);
            res.json(docs);
        });
    });

router.route('/:pics_id')
	.put(function(req, res){
        if(verify == req.body.uid){
           db.Gallery.findById(req.params.pics_id, function(err, Docs){
                if (err)
                    res.send(err);
                Docs.pics = req.body.pics;
                Docs.save(function(err) {
                    if (err)
                        res.send(err);
                    res.json({ message: 'Doc updated!' });
                });
            });
        }
    })
    .get(function(req, res) {
        db.Gallery.findById(req.params.pics_id, function(err, Docs) {
            if (err)
                res.send(err);
            res.json(Docs);
        });
    });
    
router.route('/:pics_id/:token')
    .delete(function(req, res){
            if(req.params.token == verify){
                db.Gallery.remove({_id: req.params.pics_id}, function(err, Docs) {
                    if (err)
                        res.send(err);
                    res.json({ message: 'Successfully deleted' });
                });
            }
        })


module.exports = router;