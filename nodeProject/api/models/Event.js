/**
* Event.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var Q = require('q');

module.exports = {

  attributes: {
    eventId : {
      type: 'integer',
 //     required: true,
      primaryKey: true,
      unique: true
    },
    title : {
      type: 'string',
      defaultsTo: ''
    },
    description : {
      type: 'string',
      defaultsTo : ''
    },
    address : {
      type: 'string',
      defaultsTo: ''
    },
    location : 'json',
    type : {
      type : 'string',
      required : true,
      in : ['public', 'private'],
      defaultsTo: 'public'
    },
    owner : {
      model : 'user',
 //     required: true
    },
    invitedPeople : {
      collection : 'user',
      via : 'invitedToEvents'
    }
  },

  addNew : function (event) {
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
  }
};

