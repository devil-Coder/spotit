var express = require('express');
var fs = require('fs');
var participant = require('../model/participants.js');
var authenticate = require('../authenticate.js');

var router = express.Router();

router.get('/', (req, res, next)=> {
  res.render('index', { title: 'Spot It | Muncipal Corp.' });
});

router.post('/auth/login', function (req, res) {
    authenticate.authenticate(req, res);
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