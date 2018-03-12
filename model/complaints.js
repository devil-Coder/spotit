/**
 * Created by Raj Chandra on 11-03-2018.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var complaintSchema = new Schema({
    category: {type: String},
    complaint: {type: String},
    latitude: {type: Number},
    longitude: {type: Number},
    imageUrl : {type : String},
    date: {type: Date, default: Date.now()},
    resolvedBy : {type : String},
    status : {type: Number, default: 0} //0 => not solved, 1 => solved and 2 => spam
});
var complaint = module.exports = mongoose.model('complaints', complaintSchema);
