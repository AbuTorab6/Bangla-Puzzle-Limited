const mongoose = require('mongoose');

var blogSchema = mongoose.Schema({
    title:{type:String},
    slug:{type:String},
    description:{type:String},
    comment:{type:Array,of:String,default:['NO COMMENT']}
},{versionKey:false});

var blogModel = mongoose.model('blog',blogSchema);

module.exports=blogModel;