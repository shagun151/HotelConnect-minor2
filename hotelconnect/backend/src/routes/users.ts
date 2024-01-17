import express, { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";

const router = express.Router();

// /api/users/register
router.post(
    "/register",
    [
    check("firstName", "First Name is required").isString(),
    check("lastName", "Larst Name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 0r more characters required ").isLength({
        min:6
    }),

] ,
async( req:Request,res:Response)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({message: errors.array()});
    }
    try{
        let user = await User.findOne({
            email: req.body.email,
        });

        if(user) {
            return res.status(400).json({ message: "User already exists" });
        }

        user = new User(req.body);
        await user.save();

        const token = jwt.sign(
        {userId: user.id},
        process.env.JWT_SECRET_KEY as string, 
        {
            expiresIn: "1d"
        }
        );

        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000,
        });
        return res.status(200).send({message: "User registered OK"});
    } catch(error){
        console.log(error);
        res.status(500).send({ message: "Something went wrong" });
    }
 });

 export default router;




 //  import express, { Request, Response } from "express";
// import User from "../models/user";
// import jwt from "jsonwebtoken";

// const router = express.Router();

// // /api/users/register
// router.post("/register", async (req: Request, res: Response) => {
//   try {
//     // Extract data from the request body
//     const { email, password, firstName, lastName } = req.body;

//     // Simple validation
//     if (!email || !password || !firstName || !lastName) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // Check if user already exists
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Create a new user
//     user = new User({ email, password, firstName, lastName });
//     await user.save();

//     // Generate JWT token
//     const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY as string, {
//       expiresIn: "1d",
//     });

//     // Set the token in a cookie (example: httpOnly cookie for security)
//     res.cookie("auth_token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       maxAge: 86400000, // 24 hours
//     });

//     return res.sendStatus(200);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Something went wrong" });
//   }
// });

// export default router;
