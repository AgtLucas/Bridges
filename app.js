'use strict';

var http = require('http');
var koa = require('koa');
var logger = require('koa-logger');
var route = require('koa-route');
var routes = require('./routes');
var serve = require('koa-static');

var app = koa();

app.use(logger());
app.user(serve('./public'));

app.use(route.get('/', routes.list));
app.use(route.get('/todo/new', routes.add));
app.use(route.get('/todo/:id', routes.show));
app.use(route.get('/todo/delete/:id', routes.remove));
app.use(route.get('/todo/edit/:id', routes.edit));
app.use(route.post('/todo/create', routes.create));
app.use(route.post('/todo/update', routes.update));

http.createServer(app.callback()).listen(4000);