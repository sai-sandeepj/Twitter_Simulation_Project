
const mysql = require('mysql')

const mySqlPool = mysql.createPool({
    host: '',
    port: ,
    user: '',
    password: '',
    database: 'twitter',
    multipleStatements: true
