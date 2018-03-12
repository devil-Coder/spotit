/**
 * Created by Raj Chandra on 11-03-2018.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var participantSchema = new Schema({
    name : {type : String,required: true},
    aadharNumber: {type : String, unique: true, required: true},
    mobile: {type : String, required: true, unique: true},
    history : [{
        category: {type: String},
        complaint: {type: String},
        latitude: {type: Number},
        longitude: {type: Number},
        date: {type: Date, default: Date.now()}
    }]
});


var participant = module.exports = mongoose.model('participants', participantSchema);
