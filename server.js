require('habitat').load();
var Path = require('path');

var Hapi = require('hapi');
var Good = require('good');

var routes = require('./routes');

var server = new Hapi.Server();
server.connection({
  host: process.env.HOST,
  port: process.env.PORT
});

server.route([
  {
     method: 'GET',
     path: '/{params*}',
     handler: {
       directory: {
         path: Path.join(__dirname, 'public')
       }
     }
  }, {
    method: 'POST',
    path: '/api/signup',
    handler: routes.signup
  }, {
    method: 'POST',
    path: '/api/stripe',
    handler: routes.stripe
  }, {
    method: 'POST',
    path: '/api/paypal-one-time',
    handler: routes['paypal-one-time']
  }, {
    method: 'POST',
    path: '/api/paypal-recurring',
    handler: routes['paypal-recurring']
  }, {
    method: 'GET',
    path: '/api/paypal-one-time-redirect',
    handler: routes['paypal-one-time-redirect']
  }, {
    method: 'GET',
    path: '/api/paypal-recurring-redirect',
    handler: routes['paypal-recurring-redirect']
  }
]);

module.exports = {
  start: function(done) {
    server.register({
      register: Good,
      options: {
        reporters: [{
          reporter: require('good-console'),
          events: {
            response: '*',
            log: '*'
          }
        }]
      }
    }, function (err) {
      if (err) {
        throw err;
      }

      server.start(function () {
        server.log('info', 'Running server at: ' + server.info.uri);
        if (done) {
          done();
        }
      });
    });
  },
  stop: function(done) {
    server.stop(function() {
      server.log('info', 'Stopped server at: ' + server.info.uri);
      if (done) {
        done();
      }
    });
  }
};

