const ErrorHandler = require("../utils/errorhandler");

module.exports = (err, request, response, next)=>{

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // Wrong Mongodb Id Error
    if(err.name === "CastError")
    {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    // Mongoose duplicate key error
    if(err.code === 11000)
    {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);
    }

    // Wrong JWT error
    if(err.name === "JsonWebTokenError")
    {
        const message = `Json Web Token Is Invalid, Try Again`;
        err = new ErrorHandler(message, 400);
    }

    // Wrong Expire error
    if(err.name === "TokenExpiredError")
    {
        const message = `Json Web Token Is Expired, Try Again`;
        err = new ErrorHandler(message, 400);
    }

    response.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};