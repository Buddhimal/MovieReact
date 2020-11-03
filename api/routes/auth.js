const express = require('express');
const bodyParser = require('body-parser');
var mysql  = require('mysql');
const router = express.Router();
const conn = require('../config/dbConfig');
const jwt = require("jsonwebtoken");
const config = require('../config/config');

router.post("/", async (req, res) => {

    try {
        conn.query('SELECT * FROM users where username=? and password=?', [req.body.username,req.body.password], function (error, results, fields) {
            if (error) throw error;

            if(results.length>0){
                // console.log("found customer: ", results[0]['username']);

                let token = jwt.sign({ id: results[0]['id'] , email: results[0]['username'], type:results[0]['user_type'] }, config.SECRET_KEY);

                return res.send({status:"success",msg:"Success", token: token});

            } else{
                return res.send({status:"failed",msg:"Wrong Username or Password"});
            }
        });

    } catch (e) {
        return res.status(500).send(e.message);
    }

});

module.exports = router;