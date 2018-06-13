const internals = {};

internals.applyRoutes = function (server, next) {

    server.route({
        method: 'GET',
        path: '/{glob*}',
        config: {
            auth: {
                mode: 'try',
                strategy: 'session'
            },
            plugins: {
                'hapi-auth-cookie': {
                    redirectTo: false
                }
            }
        },
        handler: function (request, reply) {

            if (request.params.glob !== 'logout' && request.auth.isAuthenticated) {

                return reply.redirect('/home');
            }

            reply.file('server/web/landing/index.html');
        }
    });

    next();
};

exports.register = function (server, options, next) {

    server.dependency('auth', internals.applyRoutes);

    next();
};

exports.register.attributes = {
    name: 'web/landing'
};
