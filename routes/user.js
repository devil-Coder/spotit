var express = require('express');
var fs = require('fs');
var participant = require('../model/participants.js');
var complaint = require('../model/complaints');
var administrator = require('../model/administrators');

var router = express.Router();


router.post('/complaint/add', (req, res, next)=> {
    updateComplaint = (comapaintData)=>{
    var data = new complaint(comapaintData);
    data.save((err,doc)=>{
        if(err)
        {
            res.json({code : 1,message : "Something went wrong !!"});
        }
        else{
            fs.appendFileSync('./public/javascripts/complaints.js', JSON.stringify(doc));
            res.json({code: 0,message : "Complaint registered !"});
            }
        });
    }
    history = {
        category: req.body.category,
        complaint: req.body.complaint,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    };
    participant.update(
        { name : req.body.aadharNumber },
        { $push: { history: history } },
        (err,doc)=>{
        err?console.log(err): updateComplaint(history);
    });
});

module.exports = router;
