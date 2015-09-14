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
            var RecentPosts = new db.RecentPosts();
            RecentPosts.posts = req.body.posts;
            RecentPosts.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Recent Post List Successfully created!' });
            });
        }
    })
    .get(function(req, res) {
        db.RecentPosts.find({},function(err, docs) {
            if (err)
                res.send(err);
            res.json(docs);
        });
    });

router.route('/:post_id')
    .put(function(req, res){
        if(verify == req.body.uid){
            db.RecentPosts.findById(req.params.post_id, function(err, Docs){
                if (err)
                    res.send(err);
                Docs.posts = req.body.posts;
                Docs.save(function(err) {
                    if (err)
                        res.send(err);
                    res.json({ message: 'Doc updated!' });
                });
            });
        }
    })
    .get(function(req, res) {
        db.RecentPosts.findById(req.params.post_id, function(err, Docs) {
            if (err)
                res.send(err);
            res.json(Docs);
        });
    });


module.exports = router;
