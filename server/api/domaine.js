const Joi = require('joi');


const internals = {};


internals.applyRoutes = function (server, next) {

    const Domaine = server.plugins['hapi-mongo-models'].Domaine;


    server.route({
        method: 'GET',
        path: '/domaines',
        config: {
            auth: {
                strategy: 'session'
                // scope: ['admin']
            },
            handler: function (request, reply) {

                Domaine.find({}, (err, results) => {

                    if (err) {
                        return reply(err);
                    }

                    reply(results);
                });
            }
        }
    });

    /* this isn't rest but idgaf */
    server.route({
        method: 'POST',
        path: '/domaines',
        config: {
            auth: {
                strategy: 'session',
                scope: ['admin']
            },
            validate: {
                payload: {
                    domaine: Joi.string().required()
                }
            },
            pre: [{
                assign: 'checkUnique',
                method: function (request, reply) {

                    const conditions = {
                        domaine: request.payload.domaine
                    };

                    Domaine.findOne(conditions, (err, user) => {

                        if (err) {
                            return reply(err);
                        }

                        if (user) {
                            return reply(false);
                        }

                        reply(true);
                    });
                }
            }]
        },
        handler: function (request, reply) {

            if (request.pre.checkUnique === false) {
                return reply({ success: false });
            }

            Domaine.insertOne({
                domaine: request.payload.domaine
            }, (err, result) => {

                if (err) {
                    return reply(err);
                }

                reply(result[0]);
            });
        }
    });

    server.route({
        method: 'DELETE',
        path: '/domaine/{domaine}',
        config: {
            auth: {
                strategy: 'session',
                scope: ['admin']
            },
            handler: function (request, reply) {

                Domaine.deleteOne({ domaine: request.params.domaine }, (err, result) => {

                    if (err) {
                        return reply(err);
                    }

                    reply({ success: true });
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
    name: 'domaine'
};
