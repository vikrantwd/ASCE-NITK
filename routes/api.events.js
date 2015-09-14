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
            var events = new db.EventsOppCol();
            events.page = req.body.page,
            events.subpageOf = req.body.subpageOf,
            events.title = req.body.title,
            events.maindesc = req.body.maindesc,
            events.subdesc = req.body.subdesc,
            events.imagelink = req.body.imagelink,
            events.bannerimage = req.body.bannerimage,
            events.bannerimage2 = req.body.bannerimage2;
            events.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Successfully created!' });
            })
        }
    })
    .get(function(req, res){
        db.EventsOppCol.find({},function(err, docs) {
            if (err)
                res.send(err);
            res.json(docs);
        });
    });

router.route('/:event_id')
    .put(function(req, res){
        if(verify == req.body.uid){
            db.EventsOppCol.findById(req.params.event_id, function(err, Docs){
                if (err)
                    res.send(err);
                Docs.page = req.body.page,
                Docs.subpageOf = req.body.subpageOf,
                Docs.title = req.body.title,
                Docs.maindesc = req.body.maindesc,
                Docs.subdesc = req.body.subdesc,
                Docs.imagelink = req.body.imagelink,
                Docs.bannerimage = req.body.bannerimage,
                Docs.bannerimage2 = req.body.bannerimage2;
                Docs.save(function(err) {
                    if (err)
                        res.send(err);
                    res.json({ message: 'Doc updated!' });
                });

            });
        }
    })
    .get(function(req, res) {
        db.EventsOppCol.findById({_id:req.params.event_id}, function(err, Docs) {
            if (err)
                res.send(err);
            console.log(arguments);
            res.json(Docs);
        });
    });
    
router.route('/:event_id/:token')
    .delete(function(req, res){
        if(verify == req.params.token){
            db.EventsOppCol.remove({_id: req.params.event_id}, function(err, Docs) {
                if (err)
                    res.send(err);
                res.json({ message: 'Successfully deleted' });
            });
        }
    })

module.exports = router;



