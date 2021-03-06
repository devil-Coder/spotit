var express = require('express');
var fs = require('fs');
var participant = require('../model/participants.js');
var complaint = require('../model/complaints');
var administrator = require('../model/administrators');

var authenticate = require('../authenticate.js');

var router = express.Router();

router.get('/', (req, res, next)=> {
  res.render('index', { title: 'Spot It.' });
});

router.post('/auth/login', function (req, res) {
    authenticate.authenticate(req, res);
});

router.post('/auth/admin', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    if(username === "admin" && password === "admin"){
        res.redirect('/dashboard');
    }else{
        res.json({code : 1,message : "Username/password is incorrect."});
    }
});

router.post('/auth/register', (req, res, next) => {
    if(
        (req.body.aadharNumber !== null ||
        req.body.aadharNumber !== '') &&
        (req.body.mobile !== null ||
        req.body.mobile !== '') &&
        (req.body.name !== null ||
            req.body.name !== '')
    ){
        var data = new participant({
            name : req.body.name,
            aadharNumber : req.body.aadharNumber,
            mobile : req.body.mobile
        });
        data.save((err,doc)=>{
            if(err && err.code == 11000){
                res.json({code: 1,message : "This Aadhar Card is already regsitered."});
            }
            else if(err)
            {
                res.json({code : 1,message : "Something went wrong !!"});
            }
            else{
                res.json({code: 0,message : "Success !!"});
            }
        });
    }
    else{
        res.json({code : 1,message : "Invalid Name, Aadhar Number or Mobile Number."});
    }
});

module.exports = router;
