/**
 * Created by Raj Chandra on 11/03/2018.
 */

var jwt = require('jsonwebtoken');
var participant = require('./model/participants.js');

function authenticate(req, res) {
    if (req.body.aadharNumber && req.body.mobile) {
        participant.findOne({ aadharNumber : req.body.aadharNumber }, function (err, user) {
            if (err) {
                res.send({code: 1,message: "Something went wrong! Please try again."});
            }
            else if(!user){
                res.send({code: 1,message : 'This aadhar card is not linked !'});
            }
            else if( user.mobile === req.body.mobile ){
                var userData = {
                    userId : user._id,
                    name : user.name.firstName + ' ' + user.name.lastName
                };
                var token = jwt.sign(userData, process.env.SECRET);

                // return the information including token as JSON
                res.cookie(process.env.TOKEN_NAME,token);
                res.json({
                    code: 0 ,
                    message: 'Success!',
                    token : token,
                    user : user
                });
            }
        })
    }
}

function check_token(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.cookies[process.env.TOKEN_NAME];
    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, process.env.SECRET, function(err, decoded) {
            if (err) {
                return res.json({code: 1,message: "Session expired !!"});
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    }
    else {
        return res.status(403).send('You are Not authorised to visit this URL. Please login first.');//json({code :0,message: "Unauthorized entry Not allowed"});//Token doesn't exist !!
    }
}

module.exports = {authenticate: authenticate, verify_token: check_token};