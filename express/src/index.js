var cors = require('cors');
var http = require('http');
var express = require('express');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());

var server = http.createServer(app);
var router = require('./router');

app.use('/api', router);

server.listen(3005);


