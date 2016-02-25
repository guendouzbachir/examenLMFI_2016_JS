'use strict';

// import libraries
const Boom      = require('boom');
const internals = {}; // Declare internals >> see: http://hapijs.com/styleguide

/**
 * Controller Class definition
 */
class Controller {

    constructor(lib) {
        // store data in private global property
        Object.assign(internals, { _lib: lib });
    }

    /**
     * Function to do controller process
     * @returns {*}
     */
    handler(request, reply) {

        // get payload
        const payload = request.params;

        request.log(['debug'], 'START < Todos.Controller.handler.delete > Params => ' + JSON.stringify(payload));

        // call lib to delete todos
        internals._lib.delete(payload, (err, response) => {

            if (err) {
                request.log(['info'], '< Todos.Controller.handler.delete > An error occurred :');
                request.log(['error'], err);
                request.log(['debug'], 'END < Todos.Controller.handler.delete > with error');

                return reply(Boom.wrap(err));
            }

            request.log(['info'], '< Todos.Controller.handler.delete > Todo successfully deleted');

            reply(response).code(204);

            request.log(['debug'], 'END < Todos.Controller.handler.delete >');
        });
    }
}

/**
 * Export class
 *
 * @type {Controller}
 */
module.exports = Controller;
