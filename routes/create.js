var express = require('express');
var router = express.Router();
var dbconn = require('../db');

router.get('/',function (req,res) {
    res.render('create');
});

router.post('/', function (req, res) {
    dbconn.then(function (db) {
       db.collection('ad');
       const note = {
           title: req.body.title,
           body: req.body.body,
           price: req.body.price,
           img: req.body.img
       };
       db.collection('ad').insert(note, function (err, result) {
           if (err) {
               res.send({'error': 'An error has occurred'});
           } else {
               res.redirect('/');
           }
       });
   });
});


module.exports = router;
