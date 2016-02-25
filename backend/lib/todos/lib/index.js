'use strict';

// import libraries
const Async     = require('async');
const Joi       = require('joi');
const Boom      = require('boom');
const internals = {};

/* Private properties */
internals._instance = null;
internals._constants = {
    todo: 'todo',
    replaceTodoId: '{todoId}'
};

/**
 * Define {TodosLib} class
 */
class TodosLib {

    constructor() {}

    /**
     * Sets private _server property value
     *
     * @param value
     */
    set server(value) {

        this._server = value;
    }

    /**
     * Returns private _server property value
     *
     * @returns {*}
     */
    get server() {

        return this._server;
    }

    /**
     * Sets private _utils property value
     *
     * @param value
     */
    set utils(value) {

        this._utils = value;
    }

    /**
     * Returns private _utils property value
     *
     * @returns {*}
     */
    get utils() {

        return this._utils;
    }

    /**
     * Sets private _db property value
     *
     * @param value
     */
    set db(value) {

        this._db = value;
    }

    /**
     * Returns private _db property value
     *
     * @returns {*}
     */
    get db() {

        return this._db;
    }

    /**
     * Function to create new todos in DB
     *
     * @param payload - Data to insert in DB
     * @param callback - Callback method
     */
    create(payload, callback) {

        this.server.log(['debug'], 'START < Todos.Lib.create >');

        Async.waterfall(
            [
                (cb) => {

                    Joi.validate(payload, this.utils.schema.createTodoRequest, (err) => {

                        if (err) {
                            return cb(Boom.preconditionFailed(err.message));
                        }

                        cb();
                    });
                },
                (cb) => {

                    // assign new variables
                    const Data = {
                        name: payload.name,
                        statut: "A faire",
                        creationDate : new Date()
                    };

                    if (payload.statut) {
                        Object.assign(Data, { statut: payload.statut});
                    }

                    this.server.log(['debug'], '< Todos.Lib.create > Data to insert in DB => ' + JSON.stringify(Data));

                    // create todos in db
                    this.db.todos.create(Data, (err, todo) => {

                        if (err) {
                            return cb(Boom.wrap(err));
                        }

                        if (!todo) {
                            return cb(Boom.badData('Todo can\'t be created'));
                        }

                        cb(null, todo.response());
                    });
                },
                (todo, cb) => {

                    this.utils.getUrl(internals._constants.todo, null,
                        [
                            {
                                replace: internals._constants.replaceTodoId,
                                value: todo.id
                            }
                        ], (err, url) => {

                            if (err) {
                                return cb(Boom.wrap(err));
                            }

                            // add link in response object
                            Object.assign(todo, { link: url });

                            cb(null, todo);
                        });
                }
            ],
            (err, response) => {

                if (err) {
                    this.server.log(['debug'], 'END < Todos.Lib.create > with error');

                    return callback(err);
                }

                this.server.log(['debug'], 'END < Todos.Lib.create >');

                callback(null, response);
            }
        );
    }

    /**
     * Function to read all todos in DB
     *
     * @param callback - Callback method
     */
    readAll(callback) {

        this.server.log(['debug'], 'START < Todos.Lib.readAll >');

        Async.waterfall(
            [
                (cb) => {

                    // read all todos in db
                    this.db.todos.readAll((err, todos) => {

                        if (err) {
                            return cb(Boom.wrap(err));
                        }

                        if (!todos || todos.length === 0) {
                            this.server.log(['debug'], 'END < Todos.Lib.readAll > without data');

                            return callback();
                        }

                        cb(null, todos);
                    });
                },
                (todos, cb) => {

                    // create links array
                    const links = [];

                    // build link for each todos
                    Async.each(todos, (todo, c) => {

                        this.utils.getUrl(internals._constants.todo, null,
                            [
                                {
                                    replace: internals._constants.replaceTodoId,
                                    value: todo._id.toString()
                                }
                            ], (err, url) => {

                                if (err) {
                                    return c(Boom.wrap(err));
                                }

                                // push url in links array
                                links.push(url);

                                c();
                            });
                    }, (err) => {

                        if (err) {
                            return cb(Boom.wrap(err));
                        }

                        cb(null, links);
                    });
                }
            ],
            (err, response) => {

                if (err) {
                    this.server.log(['debug'], 'END < Todos.Lib.readAll > with error');

                    return callback(err);
                }

                this.server.log(['debug'], 'END < Todos.Lib.readAll >');

                callback(null, response);
            }
        );
    }

    /**
     * Function to find a todos
     *
     * @param params - route parameters
     * @param callback - callback function
     */
    read(params, callback) {

        this.server.log(['debug'], 'START < Todos.Lib.read >');

        Async.waterfall(
            [
                (cb) => {

                    Joi.validate(params, this.utils.schema.todoRequest, (err) => {

                        if (err) {
                            return cb(Boom.preconditionFailed(err.message));
                        }

                        cb();
                    });
                },
                (cb) => {

                    // get todos for current id
                    this.db.todos.read(params.todoId, (err, todo) => {

                        if (err) {
                            return cb(Boom.wrap(err));
                        }

                        if (!todo) {
                            return cb(Boom.notFound('No todo found for _id `' + params.todoId + '`'));
                        }

                        cb(null, todo.response());
                    });
                },
                (todo, cb) => {

                    this.utils.getUrl(internals._constants.todo, null,
                        [
                            {
                                replace: internals._constants.replaceTodoId,
                                value: todo.id
                            }
                        ], (err, url) => {

                            if (err) {
                                return cb(Boom.wrap(err));
                            }

                            // add link in response object
                            Object.assign(todo, { link: url });

                            cb(null, todo);
                        });
                }
            ],
            (err, response) => {

                if (err) {
                    this.server.log(['debug'], 'END < Todos.Lib.read > with error');

                    return callback(err);
                }

                this.server.log(['debug'], 'END < Todos.Lib.read >');

                callback(null, response);
            }
        );
    }

    /**
     * Function to update a todos
     *
     * @param params - route parameters
     * @param payload - route payload
     * @param callback - callback function
     */
    update(params, payload, callback) {

        this.server.log(['debug'], 'START < Todos.Lib.update >');

        Async.waterfall(
            [
                (cb) => {

                    Joi.validate(params, this.utils.schema.todoRequest, (err) => {

                        if (err) {
                            return cb(Boom.preconditionFailed(err.message));
                        }

                        cb();
                    });
                },
                (cb) => {

                    Joi.validate(payload, this.utils.schema.updateTodoRequest, (err) => {

                        if (err) {
                            return cb(Boom.preconditionFailed(err.message));
                        }

                        cb();
                    });
                },
                (cb) => {

                    // create mongo update operator
                    const operator = {
                        $set: {
                            name: payload.name,
                            statut: payload.statut,
                            modificationDate: new Date()
                        }
                    };

                    // update todos for current id
                    this.db.todos.readAndUpdate(params.todoId, operator, (err, todo) => {

                        if (err) {
                            return cb(Boom.wrap(err));
                        }

                        if (!todo) {
                            return cb(Boom.notFound('No todo updated for _id `' + params.todoId + '`'));
                        }

                        cb(null, todo.response());
                    });
                },
                (todo, cb) => {

                    this.utils.getUrl(internals._constants.todo, null,
                        [
                            {
                                replace: internals._constants.replaceTodoId,
                                value: todo.id
                            }
                        ], (err, url) => {

                            if (err) {
                                return cb(Boom.wrap(err));
                            }

                            // add link in response object
                            Object.assign(todo, { link: url });

                            cb(null, todo);
                        });
                }
            ],
            (err, response) => {

                if (err) {
                    this.server.log(['debug'], 'END < Todos.Lib.read > with error');

                    return callback(err);
                }

                this.server.log(['debug'], 'END < Todos.Lib.read >');

                callback(null, response);
            }
        );
    }

    /**
     * Function to delete a todos
     *
     * @param params - route parameters
     * @param callback - callback function
     */
    delete(params, callback) {

        this.server.log(['debug'], 'START < Todos.Lib.delete >');

        Async.waterfall(
            [
                (cb) => {

                    Joi.validate(params, this.utils.schema.todoRequest, (err) => {

                        if (err) {
                            return cb(Boom.preconditionFailed(err.message));
                        }

                        cb();
                    });
                },
                (cb) => {

                    // delete todos for current id
                    // count de db/class/dao
                    this.db.todos.delete(params.todoId, (err, count) => {

                        if (err) {
                            return cb(Boom.wrap(err));
                        }

                        if (count==0) {
                            return cb(Boom.notFound('No rows deleted, no todo found for _id `' + params.todoId + '`'));
                        }

                        cb(null, count);
                    });
                },
                /*(test, cb) => {

                    this.utils.getUrl(internals._constants.todo, null,
                        [
                            {
                                replace: internals._constants.replaceTodoId,
                                value: todo.id
                            }
                        ], (err, url) => {

                            if (err) {
                                return cb(Boom.wrap(err));
                            }

                            // add link in response object
                            Object.assign(todo, { link: url });

                            cb(null, todo);
                        });
                }*/
            ],
            (err, response) => {

                if (err) {
                    this.server.log(['debug'], 'END < Todos.Lib.delete > with error');

                    return callback(err);
                }

                this.server.log(['debug'], 'END < Todos.Lib.delete >');

                callback(null, response);
            }
        );
    }

    /**
     * Returns singleton instance
     *
     * @returns {null|TodosLib|*}
     */
    static getInstance() {

        // singleton
        if (!(internals._instance instanceof TodosLib)) {
            internals._instance = new TodosLib();
        }

        return internals._instance;
    }
}

/**
 * Expose {TodosLib} class
 *
 * @type {TodosLib}
 */
module.exports = TodosLib;
