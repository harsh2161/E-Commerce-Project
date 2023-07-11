const { request, response } = require("../app");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = catchAsyncErrors(async (request, response , next) => {
    const myPayment = await stripe.paymentIntents.create({
        amount: request.body.amount,
        currency: "inr",
        metadata: {
            company: "Ecommerce",
        }
    });

    response.status(200).json({ success: true, client_secret: myPayment.client_secret });
});

exports.sendStripeKey = catchAsyncErrors(async(request, response, next) => {
    response.status(200).json({stripeApiKey: process.env.STRIPE_API_KEY});
});