'use strict';

var http = require('http')
  , koa = require('koa')
  , logger = require('koa-logger')
  , route = require('koa-route')
  , routes = require('./routes')
  , serve = require('koa-static');

var app = koa();

app.use(logger());
app.use(serve('./public'));

app.use(route.get('/', routes.list));
app.use(route.get('/todo/new', routes.add));
app.use(route.get('/todo/:id', routes.show));
app.use(route.get('/todo/delete/:id', routes.remove));
app.use(route.get('/todo/edit/:id', routes.edit));
app.use(route.post('/todo/create', routes.create));
app.use(route.post('/todo/update', routes.update));

http.createServer(app.callback()).listen(4000);