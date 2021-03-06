const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/config');
var mysql  = require('mysql');
const cors = require('cors');

const port =  config.port;

//Routes
var users = require('./routes/user');
var auth = require('./routes/auth');
var movieCategory = require('./routes/movieCategory');
var movies = require('./routes/movies');


var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//register Routes
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/movie/category', movieCategory);
app.use('/api/movies', movies);

const server = app.listen(port, function() {
    console.log('server spinned up ...');
});

module.exports = app;
