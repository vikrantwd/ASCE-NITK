var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var db = require('../db/db')

router.route('/')
    .post(function(req, res){
        db.Users.find({"username":req.body.username,"password":req.body.password},function(err, docs) {
            if (err)
                res.send(err);
            if(docs.length)
               res.json({"id":docs[0]._id});
            else
                res.json({"id":0});
        });  
    });


module.exports = router;


