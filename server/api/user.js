const internals = {};


internals.applyRoutes = function (server, next) {

    const User = server.plugins['hapi-mongo-models'].User;


    server.route({
        method: 'GET',
        path: '/users',
        config: {
            auth: {
                strategy: 'session',
                scope: ['admin']
            },
            handler: function (request, reply) {

                const filter = {
                    role: {
                        $ne: 'admin'
                    }
                };
                const fields = ['_id', 'meta', 'role', 'email', 'isBlacklisted'];

                User.find(filter, { fields }, (err, results) => {

                    if (err) {
                        return reply(err);
                    }

                    reply(results);
                });
            }
        }
    });

    /* this isn't rest but oh well */
    server.route({
        method: 'PUT',
        path: '/blacklist/{id}',
        config: {
            auth: {
                strategy: 'session',
                scope: ['admin']
            },
            // validate: {
            //     params: {
            //         name: Joi.string().min(3).max(10)
            //     }
            // },
            handler: function (request, reply) {

                User.blacklist(request.params.id, (err, result) => {

                    if (err) {
                        return reply(err);
                    }

                    reply({ success: true });
                });
            }
        }
    });

    server.route({
        method: 'PUT',
        path: '/unblacklist/{id}',
        config: {
            auth: {
                strategy: 'session',
                scope: ['admin']
            },
            handler: function (request, reply) {

                User.unblacklist(request.params.id, (err, result) => {

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
    name: 'user'
};
