import { ErrorResponse } from "./ErrorResponse.js";

export const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    // yaha hum error ko console kar rahe hai 
    console.error(err);

    // ye mongo error ke liyea hai like object Id issue 
    if (err.name === "CastError") {
        const message = `Resource not found with ID: ${err.value}`;
        error = new ErrorResponse(message, 404);
    }

    // Handle duplicate key errors in MongoDB
    if (err.code === 11000) {
        const message = "Duplicate field value entered";
        error = new ErrorResponse(message, 400);
    }

    // Handle validation errors
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


// start of a highorder function tryCatch

export const tryCatchHandler = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            next(error);
        }
    };
};




// end of a high order functioon tryCatch