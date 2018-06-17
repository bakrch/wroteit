const Joi = require('joi');
const MongoModels = require('mongo-models');


class Book extends MongoModels {

    static create(author,title,description,genre,language, callback){

        const self = this;
        const book = {
            author,
            title,
            description,
            genre,
            language,
            createdAt: new Date()
        };
        self.insertOne(book, (err, result) => {

            if (err) {
                return callback(err);
            }

            callback(null, result[0]);
        });
    }
    static updateBookContent(id, author, content, callback){

        const self = this;
        const query = {
            _id: MongoModels.ObjectID(id),
            author
        };
        const update = {
            $set: {
                content: {
                    html: content.html,
                    markdown: content.markdown
                }
            }
        };
        self.findOneAndUpdate(query, update, (err, result) => {

            if (err) {
                return callback(err);
            }

            callback(null, result);
        });
    }

}

Book.collection = 'books';

Book.schema = Joi.object({
    _id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    author: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    title: Joi.string(),
    description: Joi.string(),
    genre: Joi.string(),
    language: Joi.only('french', 'arabic', 'english', 'german','spanish'),
    content: Joi.object({
        html: Joi.string().default(''),
        markdown: Joi.string().default('')
    }),
    createdAt: Joi.date().default(Date.now, 'Time of creation')
});

Book.indexes = [
    { key: { title: 1, unique: 1 } },
    { key: { author: 1 } }
];

module.exports = Book;
