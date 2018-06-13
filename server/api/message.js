const Joi = require('joi');
const Boom = require('boom');


const internals = {};


internals.applyRoutes = function (server, next) {

    const Message = server.plugins['hapi-mongo-models'].Message;


    server.route({
        method: 'POST',
        path: '/messages',
        config: {
            auth: {
                strategy: 'session'
            },
            validate: {
                payload: {
                    to: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
                    message: Joi.string().required()
                }
            },
            handler: function (request, reply) {

                Message.send(request.auth.credentials.user._id, request.payload.to, request.payload.message, (err, message) => {

                    if (err) {
                        return reply(Boom.internal(err.message));
                    }
                    reply(message);
                });
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/messages',
        config: {
            auth: {
                strategy: 'session'
            },
            validate: {
                query: {
                    limit: Joi.number().min(1).max(50).default(3)
                }
            },
            handler: function (request, reply) {

                Message.read(request.auth.credentials.user._id, request.query.limit, (err, message) => {

                    if (err) {
                        return reply(Boom.internal(err.message));
                    }
                    reply(message);
                });
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/convos',
        config: {
            auth: {
                strategy: 'session'
            },
            handler: function (request, reply) {

                Message.getConvos(request.auth.credentials.user._id, (err, message) => {

                    if (err) {
                        return reply(Boom.internal(err.message));
                    }
                    reply(message);
                });
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/messages/{from}',
        config: {
            auth: {
                strategy: 'session'
            },
            validate: {
                query: {
                    limit: Joi.number().min(1).max(20).default(3)
                }
            },
            handler: function (request, reply) {

                Message.readFrom(request.auth.credentials.user._id, request.params.from, request.query.limit, (err, message) => {

                    if (err) {
                        return reply(Boom.internal(err.message));
                    }
                    reply(message);
                });
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/convo/{id}',
        config: {
            auth: {
                strategy: 'session'
            },
            validate: {
                params: {
                    id: Joi.string().guid({ version: 'uuidv4' })
                },
                query: {
                    limit: Joi.number().max(100).default(20),
                    page: Joi.number().default(1)
                }
            },
            handler: function (request, reply) {

                const limit = request.query.limit;
                const page = request.query.page;
                const convoId = request.params.id;
                // We pass request.auth.credentials.user._id for security reasons
                Message.readConvo(request.auth.credentials.user._id, convoId, page, limit, (err, message) => {

                    if (err) {
                        return reply(Boom.internal(err.message));
                    }
                    reply(message);
                });
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/convo/{id}',
        config: {
            auth: {
                strategy: 'session'
            },
            validate: {
                params: {
                    id: Joi.string().guid({ version: 'uuidv4' })
                },
                payload: {
                    message: Joi.string().required()
                }
            },
            handler: function (request, reply) {

                Message.sendToConvo(request.auth.credentials.user._id, request.params.id, request.payload.message, (err, message) => {

                    if (err) {
                        return reply(Boom.internal(err.message));
                    }
                    reply(message);
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
    name: 'message'
};
