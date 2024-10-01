import generateTokenAndSetCookie from "../utils/generateToken.js";
import User from "../models/UserModel.js";
import bcryptjs from "bcryptjs"

export const signup = async(req, res) => {

    try{
        const {userName, password} = req.body;

       

        if(!userName || !password){
            return res.status(400).json({error: "All fields are required"});
        }

        const user = await User.findOne({userName});

        if(user) {
            return res.status(400).json({error: "Username already exists"});
        }


        const salt = await bcryptjs.genSalt(10);
        const hashedPassord = await bcryptjs.hash(password, salt);

        const newUser = new User({
            userName,
            password: hashedPassord,
        })

        if(newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();


            res.status(201).json({
                message:"signup successful",
                _id:newUser._id,
                userName:newUser.userName,
                role: newUser.role
            })
        } else{
            res.status(400).json({error: "invalid use data"});
        }
    } catch(error){
        console.log("Error in signup controller", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}


export const login = async (req, res) => {

    try {
        const { username, password } = req.body;
        

        if(!username || !password){
            return res.status(400).json({ error: "All fields are required" });
            }
            
        const user = await User.findOne({ userName: username });

        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        const isPasswordCorrect = await bcryptjs.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Incorrect Password" });
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            message:"login successful",
            _id: user._id,
            userName: user.userName,
            role: user.role
        });

    }
    catch (error) {
        console.log("Error in login controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}


export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}
