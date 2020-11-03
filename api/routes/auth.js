const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const conn = require('../config/dbConfig');
const jwt = require("jsonwebtoken");
const config = require('../config/config');

router.post("/", async (req, res) => {

    console.log("came");
    // return res.send("asd");

    try {
        conn.query('SELECT * FROM users where username=? and password=?', [req.body.username,req.body.password], function (error, results, fields) {
            if (error) throw error;

            if(results.length>0){
                // console.log("found customer: ", results[0]['username']);

                let token = jwt.sign({ id: results[0]['id'] , email: results[0]['username'], type:results[0]['user_type'] }, config.SECRET_KEY);

                return res.send({status:"success",msg:"Success",type:results[0]['user_type'], token: token});

            } else{
                return res.status(400).send({status:"failed",msg:"Wrong Username or Password"});
            }
        });

    } catch (e) {
        return res.status(500).send(e.message);
    }

});

router.get('/isLoggedIn', async (req, res) => {

    try {
        const token = req.header("x-jwt-token");

        console.log("Token is :" + token)

        if (!token) return res.status(400).send({isLoggedIn: false});


        jwt.verify(token, config.SECRET_KEY);
        console.log(token)
        return res.status(200).send({isLoggedIn: true});

    } catch (e) {
        return res.status(400).send({isLoggedIn: false});
    }


});

module.exports = router;