import {Request, Response} from 'express';
import User from "../models/user";

const getUser = async (req: Request, res: Response) => {
    try {
        const currentUser = await User.findOne({_id: req.userId})

        if (!currentUser) {
            return res.status(404).json({message: "User not found"});
        }

        res.json(currentUser);
    } catch (e) {
        console.log("Error getting user:", e);
        res.status(500).json({message: "Error in getting user"});
    }
}

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
};

const updateUser = async (req: Request, res: Response) => {
    try {
        const {name, addressLine1, country, city} = req.body;
        const user = await User.findById(req.userId)
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }

        user.name = name;
        user.addressLine1 = addressLine1;
        user.country = country;
        user.city = city;
        console.log("Updating user:", user);

        await user.save()

        res.send(user);

    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({message: "Error in updating user"});
    }
}

export default {
    getUser,
    createUser,
    updateUser
}