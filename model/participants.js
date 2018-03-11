/**
 * Created by Raj Chandra on 11-03-2018.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var participantSchema = new Schema({
    name : {type : String,required: true},
    aadharNumber: {type : String, unique: true, required: true},
    mobile: {type : String, required: true, unique: true,}
});


var participant = module.exports = mongoose.model('participants', participantSchema);
