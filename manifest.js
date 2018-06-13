const Confidence = require('confidence');
const Config = require('./config.js');


const criteria = {
    env: process.env.NODE_ENV
};


const manifest = {
    $meta: 'Glue options here. (plugins registration)',
    server: {
        debug: {
            request: ['error']
        },
        connections: {
            routes: {
                security: true
            }
        }
    },
    connections: [{
        port: Config.get('/port/web'),
        labels: ['web'],
        state: {
            isHttpOnly: false,
            isSecure: {
                $filter: 'env',
                production: true,
                $default: false
            }
        }
    }],
    registrations: [
        {
            plugin: {
                register: 'good',
                options: {
                    reporters: {
                        console: [{
                            module: 'good-squeeze',
                            name: 'Squeeze',
                            args: [{ log: '*', response: '*' }]
                        }, {
                            module: 'good-console'
                        }, 'stdout']
                    }
                }
            }
        },
        {
            plugin: {
                register: 'blipp',
                options: {
                    showAuth: true
                }
            }
        },
        {
            plugin: 'inert'
        },
        {
            plugin: 'bell'
        },
        {
            plugin: 'hapi-auth-cookie'
        },
        // {
        //     plugin: {
        //         register: 'crumb',
        //         options: {
        //             restful: true
        //         }
        //     }
        // },
        {
            plugin: 'vision'
        },
        {
            plugin: {
                register: 'visionary',
                options: {
                    engines: { jsx: 'hapi-react-views' },
                    compileOptions: {
                        removeCacheRegExp: '.jsx'
                    },
                    relativeTo: __dirname,
                    path: './server/web'
                }
            }
        },
        {
            plugin: {
                register: 'hapi-mongo-models',
                options: {
                    mongodb: Config.get('/hapiMongoModels/mongodb'),
                    models: {
                        AuthAttempt: './server/models/auth-attempt',
                        Session: './server/models/session',
                        User: './server/models/user',
                        Message: './server/models/message',
                        Domaine: './server/models/domaine'
                    },
                    autoIndex: Config.get('/hapiMongoModels/autoIndex')
                }
            }
        },
        {
            plugin: './server/auth'
        },
        {
            plugin: './server/mailer'
        },
        {
            plugin: './server/oauth/facebook'
        },
        {
            plugin: './server/oauth/google'
        },
        {
            plugin: './server/web/landing'
        },
        {
            plugin: './server/web/home'
        },
        {
            plugin: './server/web/public'
        },
        {
            plugin: './server/api/index',
            options: {
                routes: { prefix: '/api' }
            }
        },
        {
            plugin: './server/api/contact',
            options: {
                routes: { prefix: '/api' }
            }
        },
        {
            plugin: './server/api/login',
            options: {
                routes: { prefix: '/api' }
            }
        },
        {
            plugin: './server/api/logout',
            options: {
                routes: { prefix: '/api' }
            }
        },
        {
            plugin: './server/api/signup',
            options: {
                routes: { prefix: '/api' }
            }
        },
        {
            plugin: './server/api/me',
            options: {
                routes: { prefix: '/api' }
            }
        },
        {
            plugin: './server/api/user',
            options: {
                routes: { prefix: '/api' }
            }
        },
        {
            plugin: './server/api/domaine',
            options: {
                routes: { prefix: '/api' }
            }
        }
    ]
};


const store = new Confidence.Store(manifest);


exports.get = (key) => store.get(key, criteria);


exports.meta = (key) => store.meta(key, criteria);
