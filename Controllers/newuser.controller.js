//newuser.controller.js
import NewUser from "../Models/newuser.model.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt  from "jsonwebtoken";


const registerUser = async (req, res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        const {
        username, email, password, phone, address, pincode, country, linkedIn, interest
        } = req.body;
        
        //log the password
        console.log('Request body', req.body);
        console.log('Password:', password);

        //check if the email is already in use
        const existingnewuser = await NewUser.findOne({email});
        if(existingnewuser){
            return res.status(400).json({message: "Email already in use"});
        }

        //hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //create newuser
        const newUser = new NewUser({
            username, email, password: hashedPassword, phone, address, pincode, country, linkedIn, interest
        });


        //save the newuser
        await newUser.save(); 
        
        res.status(201).json({message: "User registered successfully"});
    }
    catch(error){
        console.error(error);
        res.status(500).json({message: "An error occurred while registering the newuser"});
    }
};

//login the user
const loginNewUser = async (req, res) =>{
    try{
        const  {email, password} = req.body;

        //check if the user exists
        const user = await NewUser.findOne({email});
        if(!user){
            return res.status(404).json({ message: "User not found"});
        }
        //compare the password with the store hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: " Invalid Password"});
        }

        //generate a JWT token 
        const token = jwt.sign(
            { userId: user._id, email: user.email}, 
            process.env.JWT_SECRET,
            { expiresIn: "1h"}
        );

        res.status(200).json({ message: "Login Successfully", token,
            user: {
                username: user.username,
                email: user.email,
                password: user.password,
                phone: user.phone,
                address: user.address,
                pincode: user.pincode,
                country: user.country,
                linkedIn: user.linkedIn,
                interest: user.interest,
            }
        });
    }catch(error){
        console.error(error);
        res.status(500).json({ message: "An error occurred while logging in"});
    }
};

//get all newuser data
const getnewuser = async(req, res) => {
    try{
        const newuser = await NewUser.find();
        res.status(200).json({newuser});
    }
    catch(error){
        console.error(error);
        res.status(500).json({message: "An error occurred while fetching newuser data"});
    }
};

//get newuser data by id
const getnewUserById = async(req, res) => {
    try{
        const newuser = await NewUser.findById(req.params.id);
        if(!newuser){
            return res.status(404).json({message: "newuser not found"});
        }
        res.status(200).json({newuser});
    }
    catch(error){
        console.error(error);
        res.status(500).json({message: "An error occurred while fetching newuser data"});
    }
};

export {registerUser, getnewuser, getnewUserById, loginNewUser};
