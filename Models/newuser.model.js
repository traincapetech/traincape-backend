//newuser.model.js
import mongoose from "mongoose";
import validator from "validator";

const newuser = mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    password:{
        type: String,
        required: true,
    },
    phone:{
        type: Number,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    pincode:{
        type: Number,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    linkedIn:{
        type: String
    },
    interest:{
        type: String,
        required: true
    },
}) 

const NewUser = mongoose.model("NewUser", newuser);

 export default NewUser;