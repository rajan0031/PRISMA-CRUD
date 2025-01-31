import { ErrorResponse } from "./ErrorResponse.js";

/**
 *errorHandler- Global error handler middleware for handling various types of errors.
 *
 * @param {object} err - The error object containing details of the error.
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @param {function} next - The next middleware function.
 * @returns {void} Sends a JSON response with the appropriate error message and status code.
 */

export const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;


    console.error(err);


    if (err.name === "CastError") {
        const message = `Resource not found with ID: ${err.value}`;
        error = new ErrorResponse(message, 404);
    }


    if (err.code === 11000) {
        const message = "Duplicate field value entered";
        error = new ErrorResponse(message, 400);
    }


    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map(val => val.message).join(", ");
        error = new ErrorResponse(message, 400);
    }

    console.log(err);

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || "Server Error",
    });
};

/**
 *tryCatchHandler-this is the high order function for handling all the try catch from the controller and the services 
 *
 * @param {function} fn - this is the callback function we pass from the controller and the service folders and ... from other files and folders if needed 
 
 */

export const tryCatchHandler = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            next(error);
        }
    };
};




