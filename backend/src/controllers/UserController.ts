import {Request, Response} from 'express';
import User from "../models/user";

const createUser = async (req: Request, res: Response) => {
    // check ì user exists
    // create user if not exists
    // return user data
    try {
        const {auth0id} = req.body;
        const existingUser = await User.findOne({auth0Id: auth0id});
        if (existingUser) {
            res.status(400).json({message: "User already exists"});
        }
        const user = new User(req.body);
        await user.save();

        res.status(201).json({
            message: "User created successfully",
            user: user.toObject()
        })

    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({message: "Error in creating user"});
    }
}

export default {
    createUser
}