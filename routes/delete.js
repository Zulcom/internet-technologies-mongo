var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var dbconn = require('../db');
router.get('/',function (req,res) {
    res.redirect('/');
});
router.post('/', function (req, res) {
    dbconn.then(function (db) {
        db.collection('ad');
        db.collection('ad').deleteOne({_id: new mongodb.ObjectID(req.body.id)})
            .then(function () {  res.redirect('/') })
    });

});

module.exports = router;
