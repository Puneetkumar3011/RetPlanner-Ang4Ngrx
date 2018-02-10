var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    id: {type: String},
    title: {type: String, required: true},
    categories: {type: String, required: true},
    content: {type: String, required: true},
    createdOn: {type: Date, required: true}
});

module.exports = mongoose.model('BlogMgmt', schema);