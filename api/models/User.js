/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
var Q = require('q');

module.exports = {

  attributes: {
    token: 'string',
    refreshed: 'boolean',
    local: {
      type: 'json' // username & password
    },
    facebook: {
      type: 'json' // id & token & email & name
    },
    ownedEvents : {
      collection : 'event',
      via : 'owner'
    },
    invitedToEvents : {
      collection : 'event',
      via : 'invitedPeople'
    }
  },

  register: function (user) {
    console.log('#User.register ', user);
    var deferred = Q.defer();
    user.refreshed = false;
    User
      //._checkEmail(fb.email)
      //.then(function () {
      //  console.log('Email checked');
      //  User
          .create(user)// TODO : if exists only update
            .then(function (userCreated) {
              console.log('User created');
              if (userCreated == null) {
                deferred.reject('User wasn\'nt created');
              }
              deferred.resolve('User created succesfully ', userCreated);
            }).catch(function (err) {
              deferred.reject('Error when trying to create user ', err);
            });
    //  })
    //  .catch(function () {
    //    deferred.reject('Email exists');
    //  });
    //return deferred.promise;
  },


  _checkEmail : function (emailToCheck) {
    console.log('#User._checkEmail');
    var deferred = Q.defer();
    User
      .count({email: emailToCheck})
      .then(function (count) {
        if (count > 0) {
          deferred.reject('Email already associated with account');
        } else {
          deferred.resolve('Email can be reserved');
        }
      })
      .catch(function (err) {
        deferred.reject('Error when trying to find Email ', err);
      });
    return deferred.promise;
  }
};

