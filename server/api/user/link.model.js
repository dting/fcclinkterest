'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LinkSchema = new Schema({
  url: {type: String, required: true}
});

module.exports = mongoose.model('Link', LinkSchema);
