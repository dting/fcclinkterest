'use strict';

var mongoose = require('mongoose');
var Link = require('./link.model');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  email: {type: String, lowercase: true},
  role: {
    type: String,
    default: 'user'
  },
  links: [Link.schema],
  provider: String,
  twitter: {},
  github: {}
});

/**
 * Virtuals
 */

// Non-sensitive info we'll be putting in the token
UserSchema.virtual('token').get(function() {
  return {
    '_id': this._id,
    'role': this.role
  };
});

module.exports = mongoose.model('User', UserSchema);
