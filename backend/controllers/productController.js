const { request, response } = require("express");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    let image = [];
  
    if (typeof req.body.image === "string") {
      image.push(req.body.image);
    } else {
      image = req.body.image;
    }
  
    const imagesLinks = [];
  
    for (let i = 0; i < image.length; i++) {
      const result = await cloudinary.v2.uploader.upload(image[i], {
        folder: "products",
      });
  
      imagesLinks.push({
        public_id: result.public_id,
        public_url: result.secure_url,
      });
    }
  
    req.body.image = imagesLinks;
    req.body.user = req.user.id;
  
    const product = await Product.create(req.body);
  
    res.status(200).json({
      success: true,
      product,
    });
});

exports.getAllProducts = catchAsyncErrors(async (request, response, next) => {

    const resultPerPage = 8;
    const productCount = await Product.countDocuments();

    const apisFeatures = new ApiFeatures(Product.find(),request.query).search().filter();
    const productsFeatures = await apisFeatures.query;

    const apiFeature = new ApiFeatures(Product.find(),request.query).search().filter().pagination(resultPerPage);
    const products = await apiFeature.query;

    let filteredProductsCount = productsFeatures.length;


    response.status(200).json({
        success:true,
        products,
        productCount,
        resultPerPage,
        filteredProductsCount
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
    });
});

exports.updateProduct = catchAsyncErrors(async (request, response , next)=>{
    let product = await Product.findById(request.params.id);

    if(!product)
    {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    let image = [];
  
    if (typeof request.body.image === "string") {
      image.push(request.body.image);
    } else {
      image = request.body.image;
    }

    if(image !==  undefined)
    {
        for (let i = 0; i < product.image.length; i++) {
            await cloudinary.v2.uploader.destroy(product.image[i].public_id);
        }

        const imagesLinks = [];
  
        for (let i = 0; i < image.length; i++) {
            const result = await cloudinary.v2.uploader.upload(image[i], {
                folder: "products",
            });
            imagesLinks.push({
                public_id: result.public_id,
                public_url: result.secure_url,
            });
        }
    
        request.body.image = imagesLinks;
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

    for (let i = 0; i < product.image.length; i++) {
        await cloudinary.v2.uploader.destroy(product.image[i].public_id);
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
        image: request.user.avatar.url,
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

    const product = await Product.findById(request.query.productId);

    if(!product)
    {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    const reviews = product.reviews.filter(rev => rev._id.toString() !== request.query.id.toString());
    
    let avg = 0;
    reviews.forEach(rev => {
        avg += rev.rating;
    });

    let ratings = 0;
    
    if(reviews.length === 0)
    {
        ratings = 0;
    }
    else {
        ratings = avg / reviews.length;
    }
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


exports.getAdminProducts = catchAsyncErrors(async (request, response, next) => {
    const products = await Product.find();
    response.status(200).json({
        success:true,
        products
    });
});