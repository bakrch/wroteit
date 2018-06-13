const Async = require('async');
const Bcrypt = require('bcrypt');
const Joi = require('joi');
const MongoModels = require('mongo-models');
const Flatten = require('flatten-obj')();
const _ = require('lodash');


class User extends MongoModels {

    static generatePasswordHash(password, callback) {

        Async.auto({
            salt: function (done) {

                Bcrypt.genSalt(10, done);
            },
            hash: ['salt', function (results, done) {

                Bcrypt.hash(password, results.salt, done);
            }]
        }, (err, results) => {

            if (err) {
                return callback(err);
            }

            callback(null, results.hash);
        });
    }

    static create(email, password, penName, token, callback) {

        const self = this;

        Async.auto({
            passwordHash: this.generatePasswordHash.bind(this, password),
            newUser: ['passwordHash', function (results, done) {

                const document = {
                    isActive: false,
                    isBlacklisted: false,
                    email: email.toLowerCase(),
                    penName,
                    login: {
                        password: results.passwordHash
                    },
                    activationToken: {
                        token,
                        expires: Date.now() + 86400000 // 24 hours
                    },
                    createdAt: new Date()
                };

                self.insertOne(document, done);
            }]
        }, (err, results) => {

            if (err) {
                return callback(err);
            }

            callback(null, results.newUser[0]);
        });
    }

    static editProfile(id, update, callback) {

        const self = this;
        Async.auto({
            passwordHash: (done) => {

                if (update.password) {
                    return this.generatePasswordHash(update.password, done);
                }
                done();

            },
            passwordUpdate: ['passwordHash', function (results,done) {

                if (results.passwordHash){

                    const updatePassword = {
                        $set: {
                            'login.password': results.passwordHash
                        }
                    };
                    return self.findByIdAndUpdate(id, updatePassword, done);

                }
                done();
            }],
            updateUser: function (done) {

                const payload = {
                    $set:  _.omitBy(Flatten({
                        email: update.email,
                        meta: {
                            name:{
                                first: update.meta.name.first,
                                middle: update.meta.name.middle,
                                last: update.meta.name.last
                            },
                            location:{
                                country: update.meta.location.country
                            },
                            birthday: update.meta.birthday
                        }
                    }), _.isUndefined)
                };

                if (Object.keys(payload.$set).length) {
                    return self.findByIdAndUpdate(id, payload, done);
                }
                done();
            }
        },
        (err, results) => {

            if (err) {
                return callback(err);
            }
            callback(null, results);
        });

    }



    static createFromFb(fbid, email, name, callback) {

        const self = this;

        const document = {
            isActive: true,
            isBlacklisted: false,
            email: email.toLowerCase(),
            login: {
                facebook: fbid
            },
            meta: {
                name
            },
            createdAt: new Date()
        };

        self.insertOne(document, (err, result) => {

            if (err) {
                return callback(err);
            }

            callback(null, result[0]);
        });
    }

    static createFromGoogle(gid, email, name, callback) {

        const self = this;
        const document = {
            isActive: true,
            isBlacklisted: false,
            email: email.toLowerCase(),
            login: {
                google: gid
            },
            meta: {
                name:{
                    first: name.given_name,
                    last: name.family_name
                }
            },
            createdAt: new Date()
        };

        self.insertOne(document, (err, result) => {

            if (err) {
                return callback(err);
            }

            callback(null, result[0]);
        });
    }

    static findByCredentials(email, password, callback) {

        const self = this;

        Async.auto({
            user: function (done) {

                const query = {
                    isActive: true,
                    isBlacklisted: false,
                    email: email.toLowerCase()
                };

                self.findOne(query, done);
            },
            passwordMatch: ['user', function (results, done) {

                if (!results.user || !results.user.login || !results.user.login.password) {
                    return done(null, false);
                }

                const source = results.user.login.password;
                Bcrypt.compare(password, source, done);
            }]
        }, (err, results) => {

            if (err) {
                return callback(err);
            }

            if (results.passwordMatch) {
                return callback(null, results.user);
            }

            callback();
        });
    }

    static findByEmail(email, callback) {

        const query = { email: email.toLowerCase() };

        this.findOne(query, callback);
    }

    // static findByFb(fbid, callback) {
    //
    //     const query = { login: { facebook: fbid } };
    //
    //     this.findOne(query, callback);
    // }
    //
    // static findByGoogle(gid, callback) {
    //
    //     const query = { login: { google: gid } };
    //
    //     this.findOne(query, callback);
    // }

    static addFb(id, fid, callback) { // @TODO also add email and set isActive to true

        const update = {
            $set: {
                'login.facebook': fid
            }
        };

        this.findByIdAndUpdate(id, update, callback);
    }

    static addGoogle(id, gid, callback) {

        const update = {
            $set: {
                'login.google': gid
            }
        };

        this.findByIdAndUpdate(id, update, callback);
    }

    static blacklist(id, callback) {

        const update = {
            $set: {
                isBlacklisted: true
            }
        };

        this.findByIdAndUpdate(id, update, callback);
    }

    static unblacklist(id, callback) {

        const update = {
            $set: {
                isBlacklisted: false
            }
        };

        this.findByIdAndUpdate(id, update, callback);
    }

}


User.collection = 'users';


User.schema = Joi.object({
    _id: Joi.object(),
    /* @TODO add these to an object + $unset them instead of true */
    isActive: Joi.boolean().default(false), // confirm email to activate
    isBlacklisted: Joi.boolean().default(false), // admin to activate
    isAvailable: Joi.boolean().default(false), // Switch off through settings
    isProfileCompleted: Joi.boolean().default(false), // complete profile to activate - not used for now
    penName: Joi.string().lowercase().required(),
    email: Joi.string().email().lowercase().required(),

    login: Joi.object({
        password: Joi.string(),
        facebook: Joi.string(), // fb user id
        google: Joi.string()
    }),

    meta: Joi.object({
        name: Joi.object({
            first: Joi.string().required(),
            middle: Joi.string().allow(''),
            last: Joi.string().required()
        }),
        location: Joi.object({
            country: Joi.string().default('ma')
        }),
        birthday: Joi.date()
    }),
    activationToken: Joi.object({
        token: Joi.string().required(),
        expires: Joi.date().required()
    }),

    resetPassword: Joi.object({
        token: Joi.string().required(),
        expires: Joi.date().required()
    }),
    createdAt: Joi.date().default(Date.now, 'Time of creation')
});

User.indexes = [
    // { key: { username: 1, unique: 1 } },
    { key: { email: 1, unique: 1 } }
];


module.exports = User;
