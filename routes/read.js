var express = require('express');
var router = express.Router();
var dbconn = require('../db');
/* GET home page. */
router.get('/', function(req, res, next) {
    dbconn.then(function (db) {
       db.collection('ad').find().toArray(function(err, docs) {
           res.render('read', { ads: docs });
       });
    });
});

module.exports = router;
