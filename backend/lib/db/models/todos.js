'use strict';

// import libraries
const Joi          = require('joi');
const BaseModel    = require('hapi-mongo-models').BaseModel;
const internals    = {};

/**
 * List of RegExp to validate schema
 *
 * @type {RegExp}
 * @private
 */
internals._regex = {
    identifier: /^[a-z\d\-\_]{1,}$/
};


/**
 * Model Class definition
 */
internals.TodosModel = BaseModel.extend({

    constructor: function (attrs) {
        // override object attributes
        Object.assign(this, attrs);
    },
    response: function () {
        // create response object
        const Data = {
            id: this._id.toString()
        };

        if (this.name) {
            Object.assign(Data, { name: this.name });
        }

        if (this.statut) {
            Object.assign(Data, { statut: this.statut });
        }

        if (this.creationDate) {
            Object.assign(Data, { creationDate: this.creationDate });
        }

        if (this.modificationDate) {
            Object.assign(Data, { modificationDate: this.modificationDate });
        }

        return Data;
    }
});

/**
 * Define collection name
 *
 * @type {string}
 * @private
 */
internals.TodosModel._collection = 'todos';

/**
 * Define collection indexes
 *
 * @type {*[]}
 */
internals.TodosModel.indexes = [
    {
        key: {
            'name': 1
        },
        name: 'todos_name',
        background: true
    }
];

/**
 * Define validation schema
 */
internals.TodosModel.schema = Joi.object().keys({
    name: Joi.string().required(),
    statut: Joi.string(),
    creationDate: Joi.date().iso().required(),
    modificationDate: Joi.date().iso()
}).required();

/**
 * Export class
 *
 * @type {TodosModel}
 */
module.exports = internals.TodosModel;
