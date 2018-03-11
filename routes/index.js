var express = require('express');
var fs = require('fs');
var participant = require('../model/participants');

var router = express.Router();

router.get('/', (req, res, next)=> {
  res.render('index', { title: 'Spot It | Muncipal Corp.' });
});

router.post('/auth/register', (req, res, next) => {
    if(
        (req.body.aadharNumber !== NULL ||
        req.body.aadharNumber !== '' ||
        req.body.aadharNumber !== undefined) &&
        (req.body.mobile !== NULL ||
        req.body.mobile !== '' ||
        req.body.mobile !== undefined)
    ){
        var data = new participant({
            aadharNumber : req.body.aadharNumber,
            mobile : req.body.mobile
        });
        data.save((err)=>{
            if(err && err.code == 11000){
                res.json({code: 0,message : "This Aadhar Card is already regsitered."});
            }
            else if(err)
            {
                res.json({code : 0,message : "Something went wrong !!"});
            }
            else{
                res.json({code: 1,message : "Success !!"});
            }
        });
    }
});

module.exports = router;