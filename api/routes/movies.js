const express = require('express');
const bodyParser = require('body-parser');
var mysql = require('mysql');
const router = express.Router();
const conn = require('../config/dbConfig')
const config = require('../config/config');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Retrieve all users
router.get('/', function (req, res) {
    conn.query('SELECT m.name,image_link,rating,description,m.id,c.category as movie_category_id  FROM movies as m JOIN movie_category as c on c.id=m.movie_category_id', function (error, results, fields) {
        if (error) throw error;
        return res.send({error: false, data: results, message: 'movie list.'});
    });
});

router.get('/:id', function (req, res) {
    conn.query('SELECT * FROM movies where id=?', [req.params.id], function (error, results, fields) {
        if (error) throw error;
        return res.send({error: false, data: results, message: 'movie list.'});
    });
});

router.delete('/:id', function (req, res) {

    const token = req.header("x-jwt-token");

    if (!token) return res.status(401).send({msg: "Access denied. No token"});

    try {
        jwt.verify(token, config.SECRET_KEY);
    } catch (e) {
        res.status(400).send({msg: "Invalid token. Please login again"});
    }


    let movie_id = req.params.id;

    if (!movie_id) {
        return res.status(400).send({error: true, message: 'Please provide movie id'});
    }
    conn.query('DELETE FROM movies WHERE id = ?', [movie_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({error: false, data: results, message: 'Movie has been updated successfully.'});
    });

});

router.post('/', function (req, res) {

    const token = req.header("x-jwt-token");

    if (!token) return res.status(401).send({msg: "Access denied. No token"});

    try {
        jwt.verify(token, config.SECRET_KEY);
    } catch (e) {
        res.status(400).send({msg: "Invalid token. Please login again"});
    }


    let movie = req.body;

    console.log(movie);

    if (!movie) {
        return res.status(400).send({error: true, message: 'Please provide Movie'});
    }

    conn.query("INSERT INTO `movies`(`movie_category_id`, `name`, `image_link`, `rating`, `description`) VALUES (?, ?, ?, ?, ?) ", [movie.movie_category_id,movie.name,movie.image_link,movie.rating,movie.description], function (error, results, fields) {
        if (error) throw error;
        return res.send({error: false, data: results, message: 'New Movie has been created successfully.'});
    });

});

router.put('/:id', function (req, res) {

    const token = req.header("x-jwt-token");

    if (!token) return res.status(401).send({msg: "Access denied. No token"});

    try {
        jwt.verify(token, config.SECRET_KEY);
    } catch (e) {
        res.status(400).send({msg: "Invalid token. Please login again"});
    }


    let movie = req.body;
    let movie_id = req.params.id;

    // console.log(movie);

    if (!movie) {
        return res.status(400).send({error: true, message: 'Please provide Movie'});
    }

    conn.query("UPDATE `movies` SET `movie_category_id` = ?, `name` =?, `image_link`=?, `rating`=?, `description`=? where id=? ", [movie.movie_category_id,movie.name,movie.image_link,movie.rating,movie.description,movie_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({error: false, data: results, message: 'Movie Updated successfully.'});
    });

});

module.exports = router;