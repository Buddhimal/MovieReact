const express = require('express');
const bodyParser = require('body-parser');
var mysql  = require('mysql');
const router = express.Router();
const conn = require('../config/dbConfig')


// Retrieve all users
router.get('/', function (req, res) {
    conn.query('SELECT * FROM movies', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'movie list.' });
    });
});

router.delete('/', function (req, res) {

    let movie_id = req.body.id;

    if (!movie_id) {
        return res.status(400).send({ error: true, message: 'Please provide movie id' });
    }
    dbConn.query('DELETE FROM movies WHERE id = ?', [movie_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Movie has been updated successfully.' });
    });

});

module.exports = router;