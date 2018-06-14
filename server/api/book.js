const Joi = require('joi');
const Boom = require('boom');


const internals = {};


internals.applyRoutes = function (server, next) {

    const Book = server.plugins['hapi-mongo-models'].Book;


    server.route({
        method: 'POST',
        path: '/books',
        config: {
            auth: {
                strategy: 'session'
            },
            validate: {
                payload: {
                    title: Joi.string().required(),
                    description: Joi.string().required(),
                    genre: Joi.string().required(),
                    language: Joi.string().only('french', 'arabic', 'english', 'german','spanish').required()
                }
            },
            handler: function (request, reply) {

                Book.create(
                    request.auth.credentials.user._id,
                    request.payload.title,
                    request.payload.description,
                    request.payload.genre,
                    request.payload.language,
                    (err, book) => {

                    if (err) {
                        return reply(Boom.internal(err.message));
                    }
                    reply(book);
                });
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/books',
        config: {
            auth: {
                strategy: 'session'
            },
            validate: {
                query: {
                    author: Joi.object().default(''),
                    title: Joi.string().default(''),
                    genre: Joi.string().default(''),
                    language: Joi.string().default(''),
                    limit: Joi.number().min(1).max(20).default(3),

                }
            },
            handler: function (request, reply) {

                const query = {
                    $and: [{}]
                }
                if(request.query.author){
                    query.$and.push({author: request.query.author});
                }
                if(request.query.title){
                    query.$and.push({title: request.query.title});
                }
                if(request.query.genre){
                    query.$and.push({genre: request.query.genre});
                }
                if(request.query.language){
                    query.$and.push({language: request.query.language});
                }
                Book.find(query,{limit: request.query.limit},(err, results) => {

                    if (err) {
                        return reply(err);
                    }

                    reply(results);
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
    name: 'book'
};
