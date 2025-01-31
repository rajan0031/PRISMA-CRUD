
/**
 * SuccessResponse  -custom success response class used to standardize API success message 
 * 
 * this class is designed to structure successful API response with a message , data and an optional HTTP status code.
 *
 * @class SuccessResponse
 * @typedef {SuccessResponse}
 */
class SuccessResponse {

    /**
     *constructor- Creates constructor to initalize the message , data,statusCode
     *
     * @constructor
     * @param {string} message -a success message describing the response 
     * @param {any} data -The response data to be sent 
     * @param {number} [statusCode=200] - the HTTP status code for the response (default:200)
     */

    constructor(message, data, statusCode = 200) {
        this.success = true;
        this.message = message;
        this.data = data;
        this.statusCode = statusCode;
    }
}

export { SuccessResponse };
