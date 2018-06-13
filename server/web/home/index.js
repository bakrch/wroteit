const internals = {};

internals.applyRoutes = function (server, next) {

    server.route({
        method: 'GET',
        path: '/home/{glob*}',
        config: {
            auth: 'session',
            handler: {
                file: 'server/web/home/index.html'
            }
        }
    });

    next();
};

exports.register = function (server, options, next) {

    server.dependency('auth', internals.applyRoutes);

    next();
};


exports.register.attributes = {
    name: 'web/home'
};
