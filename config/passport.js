var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var configAuth = require("./auth");
var db = require("../models");

module.exports = function(passport) {
  
  //Serializing user for sessions
  passport.serializeUser(function(user, done) {
    done(null, user.id)
  });

  //Deserializing the user
  passport.deserializeUser(function(id, done) {
    console.log("DESERIALIZEd USER ID: ", id);
    db.User.findOne({ where: {id: id}}).then((user, err) => {
      console.log("DESERIALIZEd USER: ", user);
      
      console.log("Function DONE: ", done);
      done(err, user);
    })
  })

  //Google Strategy
  passport.use(new GoogleStrategy({
    clientID: configAuth.googleAuth.clientID,
    clientSecret: configAuth.googleAuth.clientSecret,
    callbackURL: configAuth.googleAuth.callbackURL
  }, function(token, refreshToken, profile, done) {
    process.nextTick(function() {
      console.log("USER's PROFILE ID", profile, "STRINGIFIED: ", JSON.stringify(profile), "KEYS: ", Object.keys(profile));
      
      db.User.findOne({ where: {profileID: profile.id}}).then((user, err) => {
        if (err) return done(err);
        
        if (user) return done(null, user)
        else {
          console.log("CREATING NEW USER: ", user);
          db.User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            profileID: profile.id
          }).then((newUser) => {
            if (!newUser) {
              console.log("RETURNING NULL USER");
              return done(null, false);
            }
            console.log("RETURNING NEW USER");
            return done(null, newUser)
          })
        }
      });
    });
  }));
}
