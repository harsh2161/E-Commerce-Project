const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail.js");
const { request, response } = require("express");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

exports.registerUser = catchAsyncErrors(async(request, response, next)=> {
    const myCloud = await cloudinary.uploader.upload(request.body.avatar, {
        folder: "avatars",
        width:150,
        crop:"scale",
        public_id: `${Date.now()}`,
        resource_type: "auto",
    });
    const {name, email, password} = request.body;
    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url
        }
    });

    sendToken(user, 200, response);
});

exports.loginUser = catchAsyncErrors(async (request, response , next)=>{
    
    const {email, password} = request.body;
    if(!email || !password)
    {
        return next(new ErrorHandler("Please Enter Email & Password", 400));
    }

    const user = await User.findOne({email}).select("+password");

    if(!user)
    {
        return next(new ErrorHandler("Invalid email or password", 401));
    }
    
    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched)
    {
        return next(new ErrorHandler("Invalid email or password", 401));
    }
    sendToken(user,200, response);
});

exports.logout = catchAsyncErrors(async(request, response, next)=>{

    response.cookie("token",null,{
        expiresIn:new Date(Date.now()),
        httpOnly:true,
    });

    response.status(200).json({
        success:true,
        message:"User Logout",
    });
});

exports.forgotPassword = catchAsyncErrors(async(request, response, next)=>{
    
    const user = await User.findOne({email: request.body.email});
    
    if(!user)
    {
        return next(new ErrorHandler("User Not Found", 404));
    }

    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave:false});

    const resetPasswordUrl = `${request.protocol}://${request.get("host")}/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n${resetPasswordUrl}\n\nIf you have not requested this email than, please ignore it`;

    try {
        await sendEmail({
            email:user.email,
            subject:`Ecommerce Password Recovery`,
            message,
        });
        response.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully`,
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({validateBeforeSave:false});
        return next(new ErrorHandler(error.message, 500));
    }
});

exports.resetPassword = catchAsyncErrors(async (request, response, next)=> {
    
    const resetPasswordToken = crypto.createHash("sha256").update(request.params.token).digest("hex");
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {$gt: Date.now()},
    });


    if(!user)
    {
        return next(new ErrorHandler("Reset Password Token is invalid or has been expired", 400));
    }

    if(request.body.password !== request.body.confirmPassword)
    {
        return next(new ErrorHandler("Password does not match", 400));
    }

    user.password = request.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, response);
});

exports.getUserDetails = catchAsyncErrors(async(request , response , next) => {
    
    const user = await User.findById(request.user.id);
    response.status(200).json({
        success: true,
        user,
    });
    
});

exports.updatePassword = catchAsyncErrors(async(request , response , next) => {

    const user = await User.findById(request.user.id).select("+password");
    const isPasswordMatched = await user.comparePassword(request.body.oldPassword);
    
    if(!isPasswordMatched)
    {
        return next(new ErrorHandler("Old Password is Incorrect", 400));
    }

    if(request.body.newPassword !== request.body.confirmPassword)
    {
        return next(new ErrorHandler("Password does not match", 400));
    }

    user.password = request.body.newPassword;

    await user.save();

    sendToken(user, 200, response);

});

exports.updateProfile = catchAsyncErrors(async(request , response , next) => {

    const newUserData = {
        name: request.body.name,
        email: request.body.email,
    }

    if(request.body.avatar !== '')
    {
        const user = await User.findById(request.user.id);
        const imageId = user.avatar.public_id;
        await cloudinary.uploader.destroy(imageId);

        const myCloud = await cloudinary.uploader.upload(request.body.avatar, {
            folder: "avatars",
            width:150,
            crop:"scale",
            public_id: `${Date.now()}`,
            resource_type: "auto",
        });

        newUserData.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        }
    }

    const user = await User.findByIdAndUpdate(request.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    
    response.status(200).json({
        success: true,
    });
});

exports.getAllUsers = catchAsyncErrors(async ( request, response , next) => {
    const users = await User.find();
    response.status(200).json({
        success: true,
        users,
    });
});

exports.getSingleUser = catchAsyncErrors(async(request, response, next) => {
    const user = await User.findById(request.params.id);
    if(!user)
    {
        return next(new ErrorHandler(`User Does Not Exist With Id : ${request.params.id}`));
    }
    response.status(200).json({
        success: true,
        user,
    });
});

exports.updateUserRole = catchAsyncErrors(async(request , response , next) => {

    const newUserData = {
        name: request.body.name,
        email: request.body.email,
        role:request.body.role,
    }

    const user = await User.findByIdAndUpdate(request.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    
    response.status(200).json({
        success: true,
    });
});

exports.updateUserRole = catchAsyncErrors(async(request , response , next) => {

    const newUserData = {
        name: request.body.name,
        email: request.body.email,
        role:request.body.role,
    }

    await User.findByIdAndUpdate(request.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    
    response.status(200).json({
        success: true,
    });
});

exports.deleteUser = catchAsyncErrors(async(request , response , next) => {

    const user = await User.findById(request.params.id);

    if(!user)
    {
        return next(ErrorHandler(`User does not exist with Id: ${request.params.id}`));
    }

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    await user.deleteOne();
    
    response.status(200).json({
        success: true,
        message: "User Deleted Successfully",
    });
});

