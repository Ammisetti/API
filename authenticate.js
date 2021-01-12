var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const Users = require('./public/javascripts/userSchema');

passport.serializeUser(function(user, done){
    done(null, user);
});

passport.deserializeUser(function(id, done) {
  done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: "1031499943587-vt8550brdiiekn60mhurvbr59nqn6a2p.apps.googleusercontent.com",
    clientSecret: "KcYaIU1BYJhPew93eiL5zHCj",
    callbackURL: "http://localhost:3000/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    Users.create({ googleId: profile.id, givenName: profile.name.givenName, familyName: profile.name.familyName }, function (err, user) {
        //console.log('Profile Profile Profile Profile\n\n\n');
        //console.log(user);
        return cb(null, profile);
    });
  }
));