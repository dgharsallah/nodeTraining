/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var passport = require('passport');
var http = require('http');
var querystring = require('querystring');

module.exports = {
// TODO : cron to refresh token
  // TODO : subscribe user privately in the event with private url

  goAuth: passport.authenticate('facebook'), // email & profile & friends should be scoped auto

  backFromAuth: passport.authenticate('facebook', {
    successRedirect: '/user/refresh',
    failureRedirect: '/'
  }),

  refresh: function (req, res) {
    if (req.user.refreshed == false) {
      console.log('refresh here');
      HttpServices.refreshToken(req.user.facebook.token, function (data) {
        params = querystring.parse(data);
        var newToken = params['access_token'];
        var prevToken = req.user.facebook.token;
        console.log('Response of refreshToken is : ');
        console.log('JSON format: ', params);
        console.log('Prev token: ', prevToken);
        console.log('Curr token: ', newToken);
        var newFb = req.user.facebook;
        newFb.token = newToken;
        if (prevToken != newToken) {
          console.log('different tokens so will update the token');
          User.update({"facebook.id": req.user.facebook.id}, {
            'facebook': newFb,
            refreshed: true
          }).then(function (users) {
            console.log('Updated user\'s token ', users);
            //      return res.redirect('/welcome');
          }).catch(function (err) {
            console.log('Error ', err);
          });
        } else {
          console.log('tokens are equal');
        }
      });
      //     res.redirect('/welcome');
      return res.redirect('/welcome');
    } else {
      console.log('Token refreshed');
      HttpServices.showFriends(req.user.facebook.id, function (data) {
        console.log('Friends found ', data);
      });
      return res.redirect('/welcome');
    }
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

  find: function (req, res) { // TODO: to recheck after test
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

