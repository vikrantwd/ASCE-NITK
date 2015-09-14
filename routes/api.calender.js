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
            var calender = new db.Calender();
            calender.events = req.body.events;
            calender.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Calender Successfully created!' });
            });
        }
    })
    .get(function(req, res) {
        db.Calender.find({},function(err, docs) {
            if (err)
                res.send(err);
            res.json(docs);
        });
    });

router.route('/:date_id')
    .put(function(req, res){
        if(verify == req.body.uid){
            db.Calender.findById(req.params.date_id, function(err, Docs){
                if (err)
                    res.send(err);
                Docs.events = req.body.events;
                Docs.save(function(err) {
                    if (err)
                        res.send(err);
                    res.json({ message: 'Doc updated!' });
                });
            });
        }
    })
    .get(function(req, res) {
        db.Calender.findById(req.params.date_id, function(err, Docs) {
            if (err)
                res.send(err);
            res.json(Docs);
        });
    });
    
router.route('/:date_id/:token')
    .delete(function(req, res){
        if(verify == req.params.token){
            db.Calender.remove({_id: req.params.date_id}, function(err, Docs) {
                if (err)
                    res.send(err);
                res.json({ message: 'Successfully deleted' });
            });
        }
    })

module.exports = router;



