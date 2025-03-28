//buynow.model.js
import mongoose from "mongoose";

const buynow = mongoose.Schema({
    Cart:[{
        Item:{
        type: String,
        required: true
        },
        Price: {
        type: Number,
        required: true
    },
    Quantity: {
        type: Number,
        required: true
    },
}],
    Total: {
        type: Number,
        required: true
    }
});

const BuyNow = mongoose.model("BuyNow", buynow);

export default BuyNow;