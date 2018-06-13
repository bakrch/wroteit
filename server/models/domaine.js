const Joi = require('joi');
const MongoModels = require('mongo-models');


class Domaine extends MongoModels {

}


Domaine.collection = 'domaine';


Domaine.schema = Joi.object({
    _id: Joi.object(),
    domaine: Joi.string().lowercase().required()
});


Domaine.indexes = [
    { key: { domaine: 1 } }
];


module.exports = Domaine;
