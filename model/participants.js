/**
 * Created by Raj Chandra on 11-03-2018.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var participantSchema = new Schema({
    aadharNumber: {type : String, unique: true, required: true},
    mobile: {type : String, required: true, unique: true,}
});


var participant = mongoose.model('participants', participantSchema);

module.exports = {participant: participant};


