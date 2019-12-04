var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
var { Musers } = require("./model/Musers");
//var config = require("./config");
var secret = "cmpe273_kafka_passport_mongo";


// Setup work and export for the JWT passport strategy
module.exports = function (passport) {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = secret;
    passport.use(
        new JwtStrategy(opts, function (jwt_payload, done) {
            Musers.findOne({ id: jwt_payload.id }, function (err, user) {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        })
    );
};
