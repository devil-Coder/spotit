/**
 * Created by Raj Chandra on 11-03-2018.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var administratorSchema = new Schema({
    name : {type : String,required: true},
    username : {type : String, unique: true, required: true},
    password : {type : String,required : true}
});

var administrator = module.exports = mongoose.model('administrators', administratorSchema);
