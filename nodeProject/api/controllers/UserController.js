/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = {
// TODO : cron to refresh token
  // TODO : subscribe user privately in the event with private url
  loginLocally: function (req, res, next) {
    console.log('#UserController.login');
    passport.authenticate('local', function (err, user, info) {
      if (err)
        return next(err);
      if (!user)
        return res.badRequest();
      req.login(user, function (err) {
        if (err)
          return next(err);
        return res.send({user: user});
      })
    })(req, res, next);
  },

  goAuth: passport.authenticate('facebook', { scope: ['email']}),

  backFromAuth: passport.authenticate('facebook', {
    successRedirect: '/welcome',
    failureRedirect: '/'
  }),

  //create: function (req, res) {
  //  // verification
  //  console.log('#UserController.create');
  //  var user = {};
  //  user.facebookToken = req.param('facebookToken');
  //  user.email = req.param('email');
  //  console.log('Attempt for creating ', user);
  //  User
  //    .register(user)
  //    .then(function (user) {
  //      return res.send('User created successefully ', user);
  //    })
  //    .catch(function (err) {
  //      return res.send('Email already exists');
  //    });
  //},

  update: function (req, res) {

  },

  delete: function (req, res) {
    var user = {};
    user.email = req.param('email');
    User
      .destroy({email: user.email})
      .then(function (userDestroyed) {
        return res.send('User is destroyed');
      })
      .catch(function (err) {
        return res.badRequest();
      });
  },

  find: function (req, res) {
    var email = req.param('email');
    User
      .find({email: email})
      .then(function (foundUsers) {
        return res.send({users: foundUsers});
      })
      .catch(function (err) {
        return res.badRequest();
      });
  },

  findOne: function (req, res) {
    var email = req.param('email');
    User
      .findOne({email: email})
      .then(function (foundUser) {
        return res.send({user: foundUser});
      })
      .catch(function (err) {
        return res.badRequest();
      });
  }

};

