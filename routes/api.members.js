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
    		var Members = new db.Members();
    		Members.info = req.body,
    		Members.save(function(err) {
    			if (err)
    				res.send(err);
    			res.json({ message: 'Members List Successfully created!' });
    		});
        }
	})
	.get(function(req, res) {
		db.Members.find({},function(err, docs) {
            if (err)
                res.send(err);
            res.json(docs);
        });
    });

router.route('/:member_id')
	.put(function(req, res){
        if(verify == req.body.uid){
            var Members = new db.Members();
            db.Members.findById(req.params.member_id, function(err, Docs){
                if (err)
                    res.send(err);
                Docs.info = req.body.info;
                console.log(Docs.info)
                Docs.save(function(err) {
                    if (err)
                        res.send(err);
                    res.json({ message: 'Doc updated!' });
                });
            });
        }
    })
    .get(function(req, res) {
        var Members = new db.Members();
        db.Members.findById(req.params.member_id, function(err, Docs) {
            if (err)
                res.send(err);
            res.json(Docs);
        });
    });

router.route('/:member_id/:token')
    .delete(function(req, res){
        if(verify == req.params.token){
            var Members = new db.Members();
            db.Members.remove({_id: req.params.member_id}, function(err, Docs) {
                if (err)
                    res.send(err);
                res.json({ message: 'Successfully deleted' });
            });
        }
    })

module.exports = router;
