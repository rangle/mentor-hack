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
  ['get', 'users', mapper.get('users', [], ['isMentor'])],
  ['get', 'teams', mapper.get('teams')],
  ['put', 'users/:_id', mapper.put('users')],
  ['put', 'teams/:_id', mapper.put('teams')],
  ['post', 'users', mapper.post('users')],
  ['post', 'teams', mapper.post('teams')],
  ['del', 'users/:_id', mapper.del('users')],
  ['del', 'teams/:_id', mapper.del('teams')]

];