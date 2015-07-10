var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var FacebookStrategy = require('passport-facebook').Strategy;


passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User
    .findBy('id', id)
    .then(function (user) {
      done(null, user);
    })
    .catch(function (err) {
      return done(null, err);
    });
});

passport.use(new LocalStrategy(
  function (username, password, done) {
    process.nextTick(function () {
      User
        .findBy('username', username)
        .then(function (user) {
          if (!user) {
            return done(null, false, {
              message: 'Unknown user ' + username
            });
          }
          bcrypt.compare(password, user.password, function (err, res) {
            if (!res)
              return done(null, false, {
                message: 'Invalid Password'
              });
            return done(null, user, {
              message: 'Logged In Successfully'
            });
          });
        })
        .catch(function (err) {
          return done(null, err);
        });
    })
  }));

passport.use(new FacebookStrategy({
    clientID: '1424222327904491',
    clientSecret: '3b2feb4cf09e3dca53b6dda7e154fe10',
    callbackURL: 'http://localhost:1337/auth/facebook/callback'
  },
  function (accessToken, refreshToken, profile, done) {
    console.log('#PassportService.authFunction');
    process.nextTick(function () {
      User.findOne({'facebook.id': profile.id}, function (err, user) {
        if (err)
          return done(err);
        if (user) {
          console.log('User found ', user);
          return done(null, user);
        }
        else {
          console.log('No user found so he will be created');
          var newUser = {};
          newUser.facebook = {};
          console.log(profile);
          newUser.facebook.id = profile.id;
          newUser.facebook.facebookToken = accessToken;
          newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
          newUser.facebook.email = profile.emails[0].value;
          console.log('User will be saved ', newUser);
          User
            .register(newUser)
            .then(function (user) {
              return res.send({user: user});
            })
            .catch(function (err) {
              console.log('Error when registering user ', err);
              return res.badRequest();
            });
          console.log('User registered');
        }
      });
    })
  }
));
