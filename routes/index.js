var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ASCE' });
});
router.get('/events', function(req, res, next) {
  res.render('events', { title: 'ASCE Events' });
});
router.get('/opportunities', function(req, res, next) {
  res.render('opportunities', { title: 'Opportinities' });
});
router.get('/collaborate', function(req, res, next) {
  res.render('opportunities', { title: 'Collaboration' });
});
router.get('/members', function(req, res, next) {
  res.render('members', { title: 'Members' });
});


module.exports = router;
