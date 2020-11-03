// var {createPool} = require('mysql');
//
// const pool = createPool({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "movie",
//     connectionLimit: 10
// })
//
// pool.query(`select * from user`,(err,result,fields)  =>{
//     if(err){
//         return console.log(err)
//     }
//     return console.log(result);
// })

var mysql = require('mysql');

// connection configurations
var dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'movie'
});

// connect to database
dbConn.connect();

module.exports = dbConn;