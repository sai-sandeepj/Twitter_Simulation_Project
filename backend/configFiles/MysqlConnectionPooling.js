// const mysql = require('mysql');

// var pool = mysql.createPool({
//     connectionLimit: 100,
//     host: 'localhost',
//     user: 'root',
//     password: '7777',
//     database: 'twitter'
// });

// module.exports = pool;

const mysql = require('mysql')

const mySqlPool = mysql.createPool({
    host: 'twitter.cyhp17rgvbzt.us-west-1.rds.amazonaws.com',
    port: 3306,
    user: 'rajesh1234',
    password: 'rajesh1234',
    database: 'twitter',
    multipleStatements: true
})

module.exports = mySqlPool