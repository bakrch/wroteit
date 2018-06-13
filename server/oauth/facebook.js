const Async = require('async');
const Boom = require('boom');

const internals = {};


internals.applyRoutes = function (server, next) {

    const User = server.plugins['hapi-mongo-models'].User;
    const Session = server.plugins['hapi-mongo-models'].Session;

    server.route({
        path: '/login/facebook',
        method: 'GET',
        config: {
            auth: 'facebook',
            handler: function (request, reply) {

                if (!request.auth.isAuthenticated) {
                    return reply(Boom.unauthorized('Authentication failed: ' + request.auth.error.message));
                }

                const profile = request.auth.credentials.profile;

                Async.auto({
                    user: (done) => {

                        User.findByEmail(profile.email, done);
                    },
                    facebook: ['user', (results, done) => {

                        if (results.user) {
                            if (results.user.login.facebook !== profile.id) {
                                User.addFb(results.user._id.toString(), profile.id, done);
                            }
                            else {
                                done(null, results.user);
                            }
                        }
                        else {
                            User.createFromFb(profile.id, profile.email, profile.name, done);
                        }
                    }],
                    session: ['facebook', (results, done) => {

                        Session.create(results.facebook._id.toString(), done);
                    }]
                }, (err, results) => {

                    if (err) {
                        return reply(Boom.unauthorized('Authentication failed: ' + request.auth.error.message));
                    }

                    const result = {
                        id: results.session._id,
                        key: results.session.key
                    };

                    request.cookieAuth.set(result);

                    return reply.redirect('/');
                });
            }
        }

    });

    next();
};


exports.register = function (server, options, next) {

    server.dependency(['auth', 'hapi-mongo-models'], internals.applyRoutes);

    next();
};


exports.register.attributes = {
    name: 'oauth/facebook'
};
