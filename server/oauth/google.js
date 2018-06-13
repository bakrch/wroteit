const Async = require('async');
const Boom = require('boom');

const internals = {};


internals.applyRoutes = function (server, next) {

    const User = server.plugins['hapi-mongo-models'].User;
    const Session = server.plugins['hapi-mongo-models'].Session;

    server.route({
        path: '/login/google',
        method: 'GET',
        config: {
            auth: 'google',
            handler: function (request, reply) {

                if (!request.auth.isAuthenticated) {
                    return reply(Boom.unauthorized('Authentication failed: ' + request.auth.error.message));
                }

                const profile = request.auth.credentials.profile;

                Async.auto({
                    user: (done) => {

                        User.findByEmail(profile.email, done);
                    },
                    google: ['user', (results, done) => {

                        if (results.user) {
                            if (results.user.login.google !== profile.id) {
                                User.addGoogle(results.user._id.toString(), profile.id, done);
                            }
                            else {
                                done(null, results.user);
                            }
                        }
                        else {
                            User.createFromGoogle(profile.id, profile.email, profile.name, done);
                        }
                    }],
                    session: ['google', (results, done) => {

                        Session.create(results.google._id.toString(), done);
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
    name: 'oauth/google'
};
