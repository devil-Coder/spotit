var express = require('express');
var unirest = require('unirest');
var fs = require('fs');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/requestSubmission', function(req, res, next) {
    if(
        req.body.googleCaptcha===undefined ||
        req.body.googleCaptcha===null ||
        req.body.googleCaptcha===''
    ){
        console.log("No re-CAPTCHA!")
        return res.json({code: 1, message: 'Please select the reCaptcha'});
    }
    const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${process.env.GOOGLE_SECRET_KEY}&response=${req.body.googleCaptcha}&remoteip=${req.connection.remoteAddress}`;

    //make a req to veryfy the url
    request(verifyUrl,(error,response,body)=>{
        body = JSON.parse(body);

    //if Not success
    if(body.success !== undefined && !body.success){
        console.log('Failed re-captcha verification.');
        return res.json({code: 1, message: 'Failed re-captcha verification.'});
    }
    console.log(fs.createReadStream("sample_image.png"));
    unirest.post("https://g1910-spotgarbage-v1.p.mashape.com/predict_kuda_json")
        .header("X-Mashape-Key", "t7wDwE28H9mshxamfdwrk22nve1Lp1pzZumjsnaMi73XtbjM0t")
        .attach("image", fs.createReadStream("sample_image.jpeg"))
        .end(function (result) {
            // console.log(result.status, result.headers, result.body);
            console.log(result);
        });
});
module.exports = router;
