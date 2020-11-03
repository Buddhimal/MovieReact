const express = require('express');
const bodyParser = require('body-parser');
var mysql  = require('mysql');
const router = express.Router();
const conn = require('../config/dbConfig')


// Retrieve all users
router.get('/', function (req, res) {
    conn.query('SELECT * FROM movie_category', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Category list.' });
    });
});

module.exports = router;