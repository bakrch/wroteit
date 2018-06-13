const Async = require('async');
const Config = require('../config');


const internals = {};

internals.providers = Config.get('/providers');


internals.applyStrategy = (server, next) => {

    const Session = server.plugins['hapi-mongo-models'].Session;
    const User = server.plugins['hapi-mongo-models'].User;

    server.auth.strategy('facebook', 'bell', internals.providers.facebook);

    server.auth.strategy('google', 'bell', internals.providers.google);

    server.auth.strategy('session', 'cookie', {
        password: Config.get('/cookieSecret'),
        cookie: 'sid-wroteit',
        isSecure: false,
        redirectTo: '/login',
        appendNext: 'returnTo',
        isSameSite: 'Lax',
        validateFunc: (request, data, callback) => {

            Async.auto({
                session: (done) => {

                    const id = data.id;
                    const key = data.key;

                    Session.findByCredentials(id, key, done);
                },
                user: ['session', (results, done) => {

                    if (!results.session) {
                        return done();
                    }

                    User.findById(results.session.userId, done);
                }]
            }, (err, results) => {

                if (err) {
                    return callback(err);
                }

                if (!results.session) {
                    return callback(null, false);
                }

                callback(null, Boolean(results.user), results);
            });
        }
    });


    next();
};

exports.register = (server, options, next) => {

    server.dependency('hapi-mongo-models', internals.applyStrategy);

    next();
};


exports.preware = internals.preware;


exports.register.attributes = {
    name: 'auth'
};


/*
internals.applyStrategy = (server, next) => {

  server.auth.strategy('jwt', 'jwt', {
    key: SECRET_KEY,
    verifyOptions: {
      algorithms: ['HS256']
    },
    validateFunc: (decoded, request, callback) => {

      var users = [
        {
          id: 1,
          name: 'Jon Snow'
        }
      ];

      if (users.find(u => u.id === decoded.id)) {
        return callback(null, true);
      }
      else {
        return callback(null, false);
      }
    }
  });

  next();
};
*/
