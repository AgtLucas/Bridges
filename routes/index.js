'use strict';

var parse = require('co-body');
var render = require('../lib/views');
var todos = require('../models/todos');
var users = require('../models/users');

// List items
exports.list = function *() {
  var results = yield todos.find({});
  console.log(results);
  this.body = yield render('index', {todos: results});
};

// Add items - form
exports.add = function *() {
  this.body = yield render('new');
};

// Edit items - form
exports.edit = function *(id) {
  var result = yield todos.findById(id);
  console.log(JSON.stringfy(result));
  if (!result) {
    this.throw(404, 'Invalid todo id');
  }
  this.body = yield render('edit', {todo: result});
};

// Show items
exports.show = function *(id) {
  var result = yield todos.findById(id);
  if (!result) {
    this.throw(404, 'Invalid todo id');
  }
  this.body = yield render('show', {todo: result});
};

// Delete items
exports.remove = function *(id) {
  yield todos.remove({"_id": id});
  this.redirect('/');
};

// Create items
exports.create = function *() {
  var input = yield parse(this);
  console.log('Yo ' + input);
  var d = new Date();
  yield todos.insert({
    user: input.todo_username,
    name: input.todo_name,
    description: input.todo_description,
    create_on: d,
    updated_on: d
  });
  this.redirect('/');
};

// Update items
exports.update = function *() {
  var input = yield parse(this);
  console.log(input);
  yield todos.updateById(input.id, {
    user: input.todo_username,
    name: input.todo_name,
    description: input.todo_description,
    create_on: new Date(input.create_on),
    updated_on: new Date()
  });
  this.redirect('/');
};