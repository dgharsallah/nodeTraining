var https = require('https');

exports.refreshToken = function (accessToken, callback) {
  console.log('#HttpServices.refreshToken');
  var options = {
    host: 'graph.facebook.com',
    port: 443,
    path: '/oauth/access_token?grant_type=fb_exchange_token&client_id=1424222327904491'
    +'&client_secret=3b2feb4cf09e3dca53b6dda7e154fe10&fb_exchange_token=' + accessToken,
      method: 'GET'
  };
  var buffer = ''; //this buffer will be populated with the chunks of the data received from facebook
  var request = https.get(options, function (result) {
    result.setEncoding('utf8');
    result.on('data', function (chunk) {
      buffer += chunk;
    });
    result.on('end', function () {
      callback(buffer);
    });
  });
  request.on('error', function (e) {
    console.log('error from HttpServices.refreshToken: ' + e.message)
  });

  request.end();
};

exports.showFriends = function (userId, callback) {
  console.log('#HttpServices.showFriends');
  var options = {
    host: 'graph.facebook.com',
    port: 443,
    path: '/v2.3/me/friends',
    method: 'GET'
  };
  console.log('Link to be sent to ', options.path);
  var buffer = ''; //this buffer will be populated with the chunks of the data received from facebook
  var request = https.get(options, function (result) {
    result.setEncoding('utf8');
    result.on('data', function (chunk) {
      buffer += chunk;
    });
    result.on('end', function () {
      callback(buffer);
    });
  });
  request.on('error', function (e) {
    console.log('error from HttpServices.refreshToken: ' + e.message)
  });

  request.end();
};
