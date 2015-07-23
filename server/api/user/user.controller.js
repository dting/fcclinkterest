'use strict';

var User = require('./user.model');
var Link = require('./link.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var _ = require('lodash');

var validationError = function(res, err) {
  return res.status(422).json(err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.profile = function(req, res) {
  User.findById(req.params.id).select('name links').exec(function(err, user) {
    if (err) return res.status(404).send(err);
    res.status(200).json(user);
  });
};

/**
 * Removes a link from an authenticated user.
 */
exports.remove = function(req, res) {
  var pulled = req.user.links.pull({_id: req.params.id});
  if (!pulled) return res.status(500);
  req.user.save(function(err) {
    if (err) return res.status(500).send(err);
    return res.send('Removed');
  });
};

/**
 * Adds a link to an authenticated user.
 */
exports.add = function(req, res) {
  var linkCount = req.user.links.length;
  req.user.links.push(new Link({url: req.body.url}));
  req.user.save(function(err, user) {
    if (err) return res.status(500).send(err);
    var newLink = user.links[linkCount];
    return res.send(newLink);
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
