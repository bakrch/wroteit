const Async = require('async');
const Bcrypt = require('bcrypt');
const Boom = require('boom');
const Config = require('../../config');
const Joi = require('joi');


const internals = {};


internals.applyRoutes = function (server, next) {

    const Session = server.plugins['hapi-mongo-models'].Session;
    const User = server.plugins['hapi-mongo-models'].User;


    server.route({
        method: 'POST',
        path: '/signup',
        config: {
            validate: {
                payload: {
                    email: Joi.string().email().lowercase().required(),
                    penName: Joi.string().lowercase().required(),
                    password: Joi.string().required()
                }
            },
            pre: [{
                assign: 'emailCheck',
                method: function (request, reply) {

                    const conditions = {
                        email: request.payload.email
                    };

                    User.findOne(conditions, (err, user) => {

                        if (err) {
                            return reply(err);
                        }

                        if (user) {
                            return reply(Boom.conflict('Email already in use.'));
                        }

                        reply(true);
                    });
                }
            }]
        },
        handler: function (request, reply) {

            const mailer = request.server.plugins.mailer;

            Async.auto({
                token: function (done) {

                    Session.generateKeyHash(done);
                },
                sendToken: ['token' , function (results, done) {

                    const emailOptions = {
                        subject: 'Welcome aboard on ' + Config.get('/projectName') + '!',
                        to: {
                            name: request.payload.name, // @TODO
                            address: request.payload.email
                        }
                    };
                    const template = 'welcome';
                    const context = {
                        baseHref: Config.get('/baseUrl') + '/signup/activate',
                        email: request.payload.email,
                        token: results.token.key
                    };

                    //mailer.sendEmail(emailOptions, template, context, done);
                    console.log(context.token);
                    done();
                }],
                user: ['sendToken', function (results, done) {

                    const email = request.payload.email;
                    const password = request.payload.password;
                    const penName = request.payload.penName;
                    const token = results.token.hash;

                    User.create(email, password, penName, token, done);
                }]


            }, (err, results) => {

                if (err) {
                    return reply(err);
                }

                reply({ success: true });
            });
        }
    });

    server.route({
        method: 'POST',
        path: '/signup/activate',
        config: {
            validate: {
                payload: {
                    key: Joi.string().required(),
                    email: Joi.string().email().lowercase().required()
                }
            },
            pre: [{
                assign: 'user',
                method: function (request, reply) {

                    const conditions = {
                        email: request.payload.email,
                        'activationToken.expires': { $gt: Date.now() }
                    };

                    User.findOne(conditions, (err, user) => {

                        if (err) {
                            return reply(err);
                        }

                        if (!user) {
                            return reply(Boom.badRequest('Invalid email or key.'));
                        }

                        reply(user);
                    });
                }
            }]
        },
        handler: function (request, reply) {

            Async.auto({
                keyMatch: function (done) {

                    const key = request.payload.key;
                    const token = request.pre.user.activationToken.token;
                    Bcrypt.compare(token, token, done); // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! replace token with key in prod !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                },
                user: ['keyMatch', function (results, done) {

                    if (!results.keyMatch) {
                        return reply(Boom.badRequest('Invalid email or key.'));
                    }

                    const id = request.pre.user._id.toString();
                    const update = {
                        $set: {
                            isActive: true
                        },
                        $unset: {
                            activationToken: undefined
                        }
                    };

                    User.findByIdAndUpdate(id, update, done);
                }]
            }, (err, results) => {

                if (err) {
                    return reply(err);
                }

                reply({ success: true });
            });
        }
    });


    next();
};


exports.register = function (server, options, next) {

    server.dependency(['mailer', 'hapi-mongo-models'], internals.applyRoutes);

    next();
};


exports.register.attributes = {
    name: 'signup'
};
