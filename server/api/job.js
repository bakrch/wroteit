const Joi = require('joi');
const Boom = require('boom');


const internals = {};


internals.applyRoutes = function (server, next) {

    const Job = server.plugins['hapi-mongo-models'].Job;


    server.route({
        method: 'POST',
        path: '/jobs',
        config: {
            auth: {
                strategy: 'session'
            },
            validate: {
                payload: {
                    to: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
                    specifications: Joi.string().required()
                }
            },
            handler: function (request, reply) {

                Job.send(request.auth.credentials.user._id, request.payload.to, request.payload.specifications, (err, job) => {

                    if (err) {
                        return reply(Boom.internal(err.message));
                    }
                    reply(job);
                });
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/jobs',
        config: {
            auth: {
                strategy: 'session'
            },
            handler: function (request, reply) {

                Job.get(request.auth.credentials.user._id, request.auth.credentials.user.role === 'employee', (err, jobs) => {

                    if (err) {
                        return reply(Boom.internal(err.message));
                    }
                    reply(jobs);
                });
            }
        }
    });

    server.route({
        method: 'PUT',
        path: '/job/{action}/{id}',
        config: {
            auth: {
                strategy: 'session'
            },
            handler: function (request, reply) {

                //should use user's cookie for more security
                Job.updateJobStatus(request.params.id,request.params.action, (err, response) => {

                    if (err) {
                        return reply(Boom.internal(err.message));
                    }
                    reply(response);
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
    name: 'job'
};
