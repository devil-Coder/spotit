var express = require('express');
var router = express.Router();
const fs = require('fs');

var participant = require('../model/participants');
var complaint = require('../model/complaints');
var administrator = require('../model/administrators');

// var authenticate = require('../authenticate');
// router.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, enigmaPlayer-access-token");
//     if (req.method === 'OPTIONS') {
//         var headers = {};
//         headers["Access-Control-Allow-Methods"] = "GET, OPTIONS";
//         headers["Access-Control-Allow-Credentials"] = false;
//         res.writeHead(200, headers);
//         res.end();
//     } else {
//         authenticate.verify_token(req, res, next);
//     }
// });

//Authenticate developer
var authenticateAdministrator = (req, res, next)=>{
    var username = req.decoded._doc.username;
    adminstrator.findOne({username : username}, (err, doc)=> {
        if (err) {
            throw err;
        }
        else if (doc) {
            next();
        }
        else{
            res.json({code : 1 ,message : "Unauthorized Access!"});
        }
    });
}

router.post('/', (req, res) => {
    res.render('municipalVellore', { title: 'Spot It.' });
});

router.post('/complain/resolve/:complaintId/:fakeCode',authenticateAdministrator, (req, res) => {
    var id = req.params.complaintId;
    var adminId = req.decoded._doc._id;
    administrator.findOne({_id : adminId},{},(err,doc)=>{
        if(err){
            console.log(err);
            res.json({code : 1, message : "Something went wrong."})
        }
        else if(doc){
            var status = req.params.fakeCode === 1 ? 1  : 2;
            var query = {
                resolvedBy : doc.username,
                status : status
            }
            compalaint.update({_id : id },query,(err,done)=>{
                if(err){
                    res.json({code : 1, message : "Something went wrong"});
                }
                else{
                    res.json({code : 0, message : "Issue closed"});
                }
            })
        }
    })
});
module.exports = router;
