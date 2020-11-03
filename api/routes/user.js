const express = require('express');
const bodyParser = require('body-parser');
var mysql  = require('mysql');
const router = express.Router();
const conn = require('../config/dbConfig')


// Retrieve all users
router.get('/', function (req, res) {

    console.log("came")

    conn.query('SELECT * FROM users', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'users list.' });
    });
});

module.exports = router;