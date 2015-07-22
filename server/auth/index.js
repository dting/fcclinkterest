'use strict';

var express = require('express');
var passport = require('passport');
var config = require('../config/environment');
var User = require('../api/user/user.model');

// Passport Configuration
require('./twitter/passport').setup(User, config);

var router = express.Router();

router.use('/twitter', require('./twitter'));

module.exports = router;
