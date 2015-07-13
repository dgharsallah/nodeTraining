/**
 * Event.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
var Q = require('q');

module.exports = {

  attributes: {
    //eventId: {
    //  type: 'integer',
    //  //     required: true,
    //  primaryKey: true,
    //  unique: true
    //},
    title: {
      type: 'string',
      defaultsTo: ''
    },
    description: {
      type: 'string',
      defaultsTo: ''
    },
    address: {
      type: 'string',
      defaultsTo: ''
    },
    location: 'json',
    type: {
      type: 'string',
      required: true,
      in: ['public', 'private'],
      defaultsTo: 'public'
    },
    owner: {
      model: 'user'
      //     required: true
    },
    invitedPeople: {
      collection: 'user',
      via: 'invitedToEvents'
    }
  },

  addNew: function (event) {
    console.log('#Event.addNew(event)', event);
    var deferred = Q.defer();
    Event
      .create(event)
      .then(function (eventCreated) {
        if (eventCreated == null) {
          deferred.reject('Event wasn\'nt created');
        }
        console.log('Event created succesfully ', eventCreated);
        deferred.resolve(eventCreated);
      }).catch(function (err) {
        deferred.reject('Error when trying to create event ', err);
      });
    return deferred.promise;
  },

  invitePeople: function (eventId, usersIds) {

    Event
      .findOne({'eventId': eventId})
      .then(function (event) { // event found
        usersIds.forEach(function (id, index) {
          User
            .findOne({id: id})
            .then(function (user) { // user found, match it with event
              user.invitedToEvents.add(event);
              event.invitedPeople.add(user);
              console.log('user ', user, ' matched with event ', event);
            })
            .catch(function (err) {
              console.log('Error when finding user with id : ', id, ', and error is ', err);
            });
          thisUser.invitedToEvents.add(event);
        })
      })
      .catch(function (err) {
        console.log('Error when trying to find event with id : ', eventId, ' and error is ', err);
        callback(err);
      });
  }

};

