const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { request, response } = require("express");

exports.newOrder = catchAsyncErrors(async(request, response , next)=>{
    const { shippingInfo , orderItems, paymentInfo, itemsPrice , taxPrice, shippingPrice, totalPrice} = request.body;
    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: request.user._id,
    });

    response.status(201).json({
        success: true,
        order,
    });
});

exports.getSingleOrder = catchAsyncErrors(async(request, response, next) => {
    const order = await Order.findById(request.params.id).populate("user","name email");

    if(!order)
    {
        return next(new ErrorHandler("Order Not Found With This Id", 404));
    }

    response.status(200).json({
        success: true,
        order,
    });
});

exports.myOrders = catchAsyncErrors(async(request,response, next)=>{
    const orders = await Order.find({ user: request.user._id });

    response.status(200).json({
        success: true,
        orders,
    });
});

exports.getAllOrders = catchAsyncErrors(async(request, response , next)=>{

    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach(order => {
        totalAmount += order.totalPrice;
    });

    response.status(200).json({
        success: true,
        totalAmount,
        orders,
    });
});

exports.updateOrder = catchAsyncErrors(async(request, response , next)=>{

    const order = await Order.findById(request.params.id);

    if(!order)
    {
        return next(new ErrorHandler("Order Not Found With This Id", 404));
    }

    if(order.orderStatus === "Delivered"){
        return next("You have already delivered this order", 400);
    }

    if(request.body.status === "Shipped")
    {
        order.orderItems.forEach(async order=>{
            await updateStock(order.product, order.quantity);
        });
    }

    order.orderStatus = request.body.status;
    if(request.body.status === "Delivered"){
        order.deliveredAt = Date.now();
    }

    await order.save({validateBeforeSave: false});
    response.status(200).json({
        success: true,
    });
});

async function updateStock(id , quantity){
    const product = await Product.findById(id);
    product.Stock -= quantity;
    return product.save({ validateBeforeSave : true});
}

exports.deleteOrder = catchAsyncErrors(async(request, response , next)=>{

    const order = await Order.findById(request.params.id);

    if(!order)
    {
        return next(new ErrorHandler("Order Not Found With This Id", 404));
    }

    await order.deleteOne();

    response.status(200).json({
        success: true,
    });
});

