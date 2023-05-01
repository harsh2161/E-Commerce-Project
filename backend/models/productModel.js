const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please Enter Product Name"],
        trim:true
    },
    description:{
        type:String,
        required:[true, "Please Enter Product Description"]
    },
    price:{
        type:Number,
        required:[true, "Please Enter Product Price"],
        maxLength:[8, "Price cannot exceed 8 characters"]
    },
    ratings:{
        type:Number,
        default:0
    },
    image:[
        {
            public_id:{
                type:String,
                required:true
            },
            public_url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true, "Please Enter Product Category"]
    },
    stock:{
        type:Number,
        required:[true, "Please Enter Product Stock"],
        maxLength:[4,"Stock cannot Exceed 4 characters"],
        default:1
    },
    noOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true,
            },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
    createdAt: {
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model("Product", productSchema);