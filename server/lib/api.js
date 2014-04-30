/* global exports, require */

'use strict';

// var _ = require('underscore');
var koast = require('koast');
var connection = koast.getDatabaseConnectionNow();
var mapper = koast.makeMongoMapper(connection);



mapper.filter = function (result, req) {
  return true;
};

// exports.routes.push(['get', 'auth/user/:username', mapper.get('users')]);

exports.routes = [
  ['get', 'users', mapper.get('users')],
  ['get', 'teams', mapper.get('teams')],
  ['put', 'users/:_id', mapper.get('users')],
  ['post', 'users', mapper.get('users')],
  ['post', 'teams', mapper.get('teams')]

];