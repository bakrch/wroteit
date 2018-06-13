const Async = require('async');
const Joi = require('joi');
const MongoModels = require('mongo-models');
const Uuid = require('uuid/v4');


class Message extends MongoModels {

    static send(from, to, message, callback) {

        to = this.ObjectId(to);
        Async.auto({
            convo: (done) => {

                const query = {
                    $or: [
                        { from, to },
                        { from: to, to: from }
                    ]
                };

                this.findOne(query, done);
            },
            message: ['convo', (results, done) => {

                const conversation = results.convo ? results.convo.conversation : Uuid();
                const document = {
                    conversation,
                    from,
                    to,
                    message,
                    on: new Date()
                };

                this.insertOne(document, done);
            }]
        }, (err, results) => {

            if (err) {
                return callback(err);
            }

            callback(null, results.message[0]);
        });
    }
    static sendToConvo(from, convoId, message, callback) {

        Async.auto({
            convo: (done) => {

                this.findOne({

                    conversation: convoId
                }, done);
            },
            message: ['convo', (results, done) => {

                if (!results.convo) {
                    return done(new Error('Convo not found'));
                }
                const to = results.convo.to.equals(from) ? results.convo.from : results.convo.to;
                const document = {
                    conversation: convoId,
                    from,
                    to,
                    message,
                    on: new Date()
                };

                this.insertOne(document, done);
            }]
        }, (err, results) => {

            if (err) {
                return callback(err);
            }

            callback(null, results.message[0]);
        });
    }

    static read(recipient, limit, callback) {

        this.find({ to: recipient }, { limit }, callback);
    }
    static readConvo(id, convoId, page, limit, callback) {

        const filter = {
            $or: [
                { from: id },
                { to: id }
            ],
            conversation: convoId
        };
        const output = {
            data: undefined,
            pages: {
                current: page,
                prev: 0,
                hasPrev: false,
                next: 0,
                hasNext: false,
                total: 0
            },
            items: {
                limit,
                begin: ((page * limit) - limit) + 1,
                end: page * limit,
                total: 0
            }
        };

        Async.auto({
            count: (done) => {

                this.count(filter, done);
            },
            find: (done) => {

                this.aggregate([
                    {
                        $match: filter
                    },
                    { $sort: { on: -1 } },
                    { $skip: (page - 1) * limit },
                    { $limit: limit },
                    {
                        $project: {
                            isMe: {
                                $eq: ['$from', id]
                            },
                            on: 1,
                            message: 1
                        }
                    },
                    { $sort: { on: 1 } }
                ], done);
            }
        }, (err, results) => {

            if (err) {
                return callback(err);
            }

            output.data = results.find;
            output.items.total = results.count;

            output.pages.total = Math.ceil(output.items.total / limit);
            output.pages.next = output.pages.current + 1;
            output.pages.hasNext = output.pages.next <= output.pages.total;
            output.pages.prev = output.pages.current - 1;
            output.pages.hasPrev = output.pages.prev !== 0;
            if (output.items.begin > output.items.total) {
                output.items.begin = output.items.total;
            }
            if (output.items.end > output.items.total) {
                output.items.end = output.items.total;
            }

            callback(null, output);
        });
    }

    static readFrom(recipient, from, limit, callback) {

        this.find({ to: recipient, from }, { limit }, callback);
    }

    static getConvos(recipient, callback) {

        this.aggregate([
            {
                $match: {
                    $or: [
                        { to: recipient },
                        { from: recipient }
                    ]
                }
            },
            {
                $group: {
                    _id: '$conversation',
                    on: { $last: '$on' },
                    from: { $last: '$from' },
                    to: { $last: '$to' },
                    message: { $last: '$message' }
                }
            },
            {
                $project: {
                    theOtherOne: {
                        $cond: { if: { $ne: ['$from', recipient] }, then: '$from', else: '$to' }
                    },
                    on: 1,
                    message: 1
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'theOtherOne',
                    foreignField: '_id',
                    as: 'whoIsHe'
                }
            },
            { $addFields: { user: { $arrayElemAt: ['$whoIsHe', 0] } } },
            {
                $project: {
                    name: '$user.meta.name',
                    on: 1,
                    message: 1
                }
            },
            { $sort: { on: -1 } }
        ], callback);
    }
}


Message.collection = 'messages';


Message.schema = Joi.object({
    _id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    conversation: Joi.string().guid({ version: 'uuidv4' }),
    from: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    to: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    message: Joi.string(),
    on: Joi.date().default(Date.now, 'Time of creation')
});


Message.indexes = [
    { key: { to: 1 } }
];

// db.shardCollection(".message",
//   {owner: 1, sequence: 1})

module.exports = Message;
