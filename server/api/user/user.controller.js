'use strict';

var User = require('./user.model');
var Link = require('./link.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

var validationError = function(res, err) {
  return res.status(422).json(err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.profile = function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (err) return res.status(500).send(err);
    res.status(200).json(user.links);
  });
};

/**
 * Removes a link from an authenticated user.
 */
exports.remove = function(req, res) {
  var removed = _.pull(req.user.links, {id: req.params.id});
  req.user.save(function(err) {
    if (err) return res.status(500).send(err);
    return res.status(204).send(removed);
  });
};

/**
 * Change a users password
 */
exports.add = function(req, res) {
  var newLink = new Link({url: req.body.url});
  req.user.links.push(newLink);
  req.user.save(function(err) {
    if (err) return res.status(500).send(err);
    return res.status(204).send(newLink);
  });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({_id: userId}, function(err, user) {
    if (err) return next(err);
    if (!user) return res.status(401).send('Unauthorized');
    res.json(user);
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
