/**
 * EventController
 *
 * @description :: Server-side logic for managing events
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  create : function (req, res) { // needs to be authentificated
    console.log('#EventController.create');
    var event =  {};
    event.title = req.param('title');
    event.description = req.param('description');
    event.address = req.param('address');
    var lat = req.param('lat');
    var lng = req.param('lng');
    var location = {latitude : lat, longitude : lng};
    event.location = location;
    event.type = req.param('type');
 //   event.owner = req.user; // TODO : to check later
    Event
      .addNew(event)
      .then(function (createdEvent) {
        console.log('Created event ', createdEvent);
        return res.send({event : createdEvent});
      })
      .catch(function (err) {
        console.log('Error when adding new event ', err);
        return res.badRequest();
      });
  },

  update : function (req, res) {
    var newEvent = {};
    newEvent.title = req.param('title');
    newEvent.description = req.param('description');
    newEvent.address = req.param('address');
    var location = {};
    location.latitude = req.param('lat');
    location.longitude = req.param('lng');
    newEvent.location = location;
    newEvent.eventId = req.param('id');
    newEvent.type = req.param('type');
    Event
      .update({eventId : newEvent.eventId}, newEvent)
      .then(function (updatedEvent) {
        console.log('Has updated event ', updatedEvent);
        return res.send({event : updatedEvent});
      })
      .catch(function (err) {
        console.log('Error when updating event ', err);
        return res.badRequest();
      });
  },

  delete : function (req, res) {
    var id = req.param('id');
    Event
      .destroy({eventId : id})
      .then(function (deletedEvent){
        console.log('Deleted event : ', deletedEvent);
        return res.send('Event deleted');
      })
      .catch(function (err) {
        console.log('Error when destroying event ', err);
        return res.badRequest();
      })
  },

  find : function (req, res) {
    Event
      .find()
      .then(function (foundUsers) {
        return res.send({users: foundUsers});
      })
      .catch(function (err) {
        console.log('Problem finding users ', err);
        return res.badRequest();
      })
  }

};

