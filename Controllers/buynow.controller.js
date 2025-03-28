//buynow.controller.js
import { validationResult } from "express-validator";
import BuyNow from "../Models/buynow.model.js";

const storebuynow = async (req, res) => {
    console.log("Incoming request body:", JSON.stringify(req.body, null, 2)); ////////////
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            console.log("Validation errors:", errors.array()); ////////
            return res.status(400).json({ errors: errors.array() });
        }
        const {
            Cart, Total
        } = req.body;


        //validate the cart data
        const validatedCart = Cart.map(item =>{
            if(!item.Item || !item.Price == undefined || !item.Quantity == undefined){
                throw new Error("Invalid cart data");
            }
            return {
                Item: item.Item,
                Price: item.Price,
                Quantity: item.Quantity
            };
        });

        //create the cart info.
        const buynow = new BuyNow({
            Cart: validatedCart,
            Total: Number(Total)
        });

        //saving the information of cart
        await buynow.save();
        res.status(201).json({ message: "Cart created successfully"});
    } catch(error){
        res.status(500).json({ message: "An error occured while saving the cart data"});
    }
};

export {storebuynow};