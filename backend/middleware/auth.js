const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { request } = require("express");

exports.isAuthenticatedUser = catchAsyncErrors(async(request, response, next)=>{
    
    const {token} = request.cookies;
    
    if(!token){
        return next(new ErrorHandler("Please Login To Access This Resource"),401);
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    request.user = await User.findById(decodedData.id);

    next();
});

exports.authorizeRoles = (...roles) => {
    return (request, response, next) =>{
        if(!roles.includes(request.user.role)){
            return next(new ErrorHandler(`Role: ${request.user.role} is not allowed to access this resource`, 403));
        }
        next();
    }
}
