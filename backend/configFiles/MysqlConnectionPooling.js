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
    host: '',
    port: ,
    user: '',
    password: '',
    database: 'twitter',
    multipleStatements: true
})

module.exports = mySqlPool
