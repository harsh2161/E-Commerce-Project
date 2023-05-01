const { request, response } = require("express");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

exports.createProduct = catchAsyncErrors(async(request , response , next) => {

    request.body.user = request.user.id;

    const product = await Product.create(request.body);
    response.status(201).json({
        success:true,
        product
    });
});

exports.getAllProducts = catchAsyncErrors(async (request, response) => {

    const resultPerPage = 5;
    const productCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(),request.query).search().filter().pagination(resultPerPage);
    const products = await apiFeature.query;
    response.status(200).json({
        success:true,
        products
    });
});

exports.getProductDetails = catchAsyncErrors(async (request , response, next) => {

    const product = await Product.findById(request.params.id);

    if(!product)
    {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    response.status(200).json({
        success: true,
        product,
        productCount
    });
});

exports.updateProduct = catchAsyncErrors(async (request, response , next)=>{
    let product = Product.findById(request.params.id);

    if(!product)
    {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    product = await Product.findByIdAndUpdate(request.params.id, request.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    response.status(200).json({
        success:true,
        product
    })
});

exports.deleteProduct = catchAsyncErrors(async (request, response , next) => {

    const product = await Product.findById(request.params.id);

    if(!product)
    {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    await product.deleteOne();
    
    response.status(200).json({
        success:true,
        message:"Product Deleted Successfully"
    })
});

exports.createProductReview = catchAsyncErrors(async (request, response, next) => {

    const {rating , comment , productId} = request.body;

    const review = {
        user:request.user._id,
        name: request.user.name,
        rating: Number(rating),
        comment,
    };

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(rev => rev.user.toString() === request.user._id.toString());

    if(isReviewed)
    {
        product.reviews.forEach(rev => {
            if(rev.user.toString() === request.user._id.toString())
            {
                rev.rating = rating,
                rev.comment = comment
            }
        });
    }
    else{
        product.reviews.push(review);
        product.noOfReviews = product.reviews.length;
    }
    
    let avg = 0;
    product.reviews.forEach(rev => {
        avg += rev.rating;
    });
    product.ratings = avg / product.reviews.length;

    await product.save({validateBeforeSave: false})
    
    response.status(200).json({
        success: true,
    });
});

exports.getProductReviews = catchAsyncErrors(async (request, response, next) => {

    const product = await Product.findById(request.query.id);

    if(!product)
    {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    response.status(200).json({
        success: true,
        reviews: product.reviews,
    });
});

exports.deleteReviews =  catchAsyncErrors(async (request, response, next) => {

    const product = await Product.findById(request.query.id);

    if(!product)
    {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    const reviews = product.reviews.filter(rev => rev._id.toString() !== request.query.id.toString());
    
    let avg = 0;
    reviews.forEach(rev => {
        avg += rev.rating;
    });
    const ratings = avg / reviews.length;
    const noOfReviews = reviews.length;

    await Product.findByIdAndUpdate(request.query.productId,{
        reviews,
        ratings,
        noOfReviews,
    },
    {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    response.status(200).json({
        success: true,
    });
});