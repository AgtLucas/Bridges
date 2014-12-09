'use strict';

var monk = require('monk');

module.exports = monk('localhost/bridge');