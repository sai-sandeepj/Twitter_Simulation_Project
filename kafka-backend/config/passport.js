var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
var { Users } = require("./models/Users");
var secret = "cmpe273_kafka_passport_mongo";
//const mySqlPool = require('../configFiles/MysqlConnectionPooling');
var mysql = require('mysql');

// Setup work and export for the JWT passport strategy
module.exports = function (passport) {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = secret;
    passport.use(
        new JwtStrategy(opts, function (jwt_payload, done) {
    
            mySqlPool.getConnection((err, conn) => {
                if (err) {
                    return done(err, false);
                } else {
                    const sql1 = `SELECT * FROM users where userName= ${jwt_payload.userName}`;

                    conn.query(sql1, (err, result) => {
                        if (err) {
                            return done(err, false);
                        }
                        if (result) {
                            return done(null, result);
                        }
                        else {
                            return done(null, false);
                        }
                    });
                }
            });
        })
    );
};

