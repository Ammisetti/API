var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const Users = require('./public/javascripts/userSchema');

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Users.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(new GoogleStrategy({
    clientID: "1031499943587-vt8550brdiiekn60mhurvbr59nqn6a2p.apps.googleusercontent.com",
    clientSecret: "KcYaIU1BYJhPew93eiL5zHCj",
    callbackURL: "http://localhost:3000/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log('Profile is ', profile);
    Users.findOne({ googleId: profile.id }).then((currentUser)=> {
      if(currentUser) {
        //console.log(currentUser);
        cb(null, currentUser);
      } else {
        Users.create({ googleId: profile.id, givenName: profile.name.givenName, familyName: profile.name.familyName, email: profile.emails[0].value }, function (err, user) {
          //console.log('Profile Profile Profile Profile\n\n\n');
          //console.log(user);
          return cb(null, user);
        });
      }
    })
  }
));