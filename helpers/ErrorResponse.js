
/**
 * ErrorResponse- custom error response class that extends the built-in javascript Error object.
 *
 * this calss will be used to create standardize error mmessage with HTTP status codes.
 * 
 * 
 * @class ErrorResponse
 * @typedef {ErrorResponse}
 * @extends {Error}
 */

class ErrorResponse extends Error {

    /**
     * constructor-Create a constructors for inatilize this message and the statusCode
     *
     * @constructor
     * @param {string} message  - the error message to be displayed.
     * @param {number} statusCode   - the HTTP status code for the error.
     */

    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export { ErrorResponse };
