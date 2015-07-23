'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/me', auth.isAuthenticated(), controller.me);
router.get('/profile/:id', controller.profile);
router.put('/add', auth.isAuthenticated(), controller.add);
router.delete('/remove/:id', auth.isAuthenticated(), controller.remove);

module.exports = router;
