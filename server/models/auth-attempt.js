const Async = require('async');
const Config = require('../../config');
const Joi = require('joi');
const MongoModels = require('mongo-models');


class AuthAttempt extends MongoModels {
    static create(ip, email, callback) {

        const document = {
            ip,
            email: email.toLowerCase(),
            time: new Date()
        };

        this.insertOne(document, (err, docs) => {

            if (err) {
                return callback(err);
            }

            callback(null, docs[0]);
        });
    }

    static abuseDetected(ip, email, callback) {

        const self = this;

        Async.auto({
            abusiveIpCount: function (done) {

                const query = { ip };
                self.count(query, done);
            },
            abusiveIpUserCount: function (done) {

                const query = {
                    ip,
                    email: email.toLowerCase()
                };

                self.count(query, done);
            }
        }, (err, results) => {

            if (err) {
                return callback(err);
            }

            const authAttemptsConfig = Config.get('/authAttempts');
            const ipLimitReached = results.abusiveIpCount >= authAttemptsConfig.forIp;
            const ipUserLimitReached = results.abusiveIpUserCount >= authAttemptsConfig.forIpAndUser;

            callback(null, ipLimitReached || ipUserLimitReached);
        });
    }
}


AuthAttempt.collection = 'authAttempts';


AuthAttempt.schema = Joi.object({
    _id: Joi.object(),
    email: Joi.string().lowercase().required(),
    ip: Joi.string().required(),
    time: Joi.date().required()
});


AuthAttempt.indexes = [
    { key: { ip: 1, email: 1 } },
    { key: { email: 1 } }
];


module.exports = AuthAttempt;
