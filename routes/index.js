var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ASCE' });
});
router.get('/events', function(req, res, next) {
  res.render('events', { title: 'ASCE Events' });
});


module.exports = router;
