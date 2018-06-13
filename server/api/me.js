const _ = require('lodash');
const Joi = require('joi');

const internals = {};


internals.applyRoutes = function (server, next) {

    const User = server.plugins['hapi-mongo-models'].User;

    server.route({
        method: 'GET',
        path: '/me',
        config: {
            auth: {
                strategy: 'session',
                scope: ['admin', 'employee']
            }
        }
        ,
        handler: function (request, reply) {

            const user = request.auth.credentials.user;
            return reply(_.pick(user, ['email','meta']));

        }
    });
    server.route({
        method: 'GET',
        path: '/me/social',
        config: {
            auth: {
                strategy: 'session',
                scope: ['admin', 'employee']
            }
        }
        ,
        handler: function (request, reply) {

            const user = request.auth.credentials.user;
            return reply(_.pick(user.login, ['google','facebook']));

        }
    });
    server.route({
        method: 'PUT',
        path: '/me',
        config: {
            auth: {
                strategy: 'session',
                scope: ['admin', 'employee']
            },
            validate: {
                payload: {
                    first:Joi.string(),
                    middle:Joi.string().allow(''),
                    last:Joi.string(),
                    password: Joi.string(),
                    email: Joi.string(),
                    country: Joi.string().allow(''),
                    address: Joi.string().allow(''),
                    city: Joi.string().allow(''),
                    phoneNumber: Joi.string().regex(/^[567][0-9]{8}$/),
                    birthday: Joi.string().regex(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)
                }
            }
        }
        ,
        handler: function (request, reply) {

            const id = request.auth.credentials.user._id;
            const update = {
                meta: {
                    name: {
                        first:request.payload.first,
                        middle:request.payload.middle,
                        last:request.payload.last
                    },
                    location: {
                        address: request.payload.address,
                        city: request.payload.city
                    },
                    phoneNumber: request.payload.phoneNumber,
                    birthday: request.payload.birthday
                },
                password: request.payload.password,
                role: request.payload.role
            };
            User.editProfile(id,update, (err) => {

                if (err) {
                    return reply(err);
                }

                reply({ success: true });
            });
        }
    });
    server.route({
        method: 'DELETE',
        path: '/me/google',
        config: {
            auth: {
                strategy: 'session',
                scope: ['admin', 'employee']
            }
        },
        handler: function (request, reply) {

            const id = request.auth.credentials.user._id;

            const update = {
                $unset: {
                    'login.google': ''
                }
            };

            User.findByIdAndUpdate(id, update,(err) => {

                if (err) {
                    return reply(err);
                }

                reply({ success: true });
            });
        }
    });
    server.route({
        method: 'DELETE',
        path: '/me/facebook',
        config: {
            auth: {
                strategy: 'session',
                scope: ['admin', 'employee']
            }
        },
        handler: function (request, reply) {

            const id = request.auth.credentials.user._id;

            const update = {
                $unset: {
                    'login.facebook': ''
                }
            };

            User.findByIdAndUpdate(id, update,(err) => {

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

    server.dependency(['auth', 'hapi-mongo-models'], internals.applyRoutes);

    next();
};


exports.register.attributes = {
    name: 'me'
};
