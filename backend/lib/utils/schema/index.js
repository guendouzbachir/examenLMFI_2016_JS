/* See LICENSE file for terms of use */
'use strict';

const Joi       = require('joi');
const internals = {};

// add custom validators
Joi.objectId = require('joi-objectid')(Joi);

/**
 * List of RegExp to validate schema
 *
 * @type {RegExp}
 * @private
 */
internals._regex = {
    replacePathParams: /^{([\w_]{1,})}$/,
    valuePathParams: /^[\w\d\-\_]{1,}$/,
    identifier: /^[a-z\d\-\_]{1,}$/
};

module.exports = {
    endPoint: Joi.string().valid('todos', 'todo').required(),
    params: Joi.object().required().allow(null),
    pathParams: Joi.array().items(
        Joi.object().keys({
            replace: Joi.string().required().regex(internals._regex.replacePathParams),
            value: Joi.string().required().regex(internals._regex.valuePathParams)
        })
    ).unique().allow(null),
    createTodoRequest: Joi.object().keys({
        name: Joi.string().required(),
        statut: Joi.string()
    }).required(),
    todoResponse: Joi.object().keys({
        id: Joi.objectId().required(),
        name: Joi.string(),
        statut: Joi.string(),
        creationDate: Joi.date().iso(),
        modificationDate: Joi.date().iso(),
        link: Joi.string().uri().required()
    }).required(),
    todosResponse: Joi.array().items(
        Joi.string().uri(),
        Joi.object().keys({
            id: Joi.objectId(),
            name: Joi.string(),
            statut: Joi.string(),
            creationDate: Joi.date().iso(),
            modificationDate: Joi.date().iso(),
            link: Joi.string().uri().required()
        })
    ).unique().required(),
    todoRequest: Joi.object().keys({
        todoId: Joi.objectId().required()
    }).required(),
    updateTodoRequest: Joi.object().keys({
        name: Joi.string(),
        statut: Joi.string()
    }).required()
};
