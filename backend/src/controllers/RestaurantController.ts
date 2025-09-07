import {Request, Response} from 'express';
import Restaurant from "../models/restaurant";
import cloudinary from "cloudinary";
import mongoose from "mongoose";

const createRestaurant = async (req: Request, res: Response) => {
    try {
        // one user can create only one restaurant
        console.log("body: ",req.body)
        const existingRestaurant = await Restaurant.findOne({user: req.userId});

        if (existingRestaurant) {
            // 409 is duplicate conflict
            return res.status(409).json({message: "User already has a restaurant"});
        }
        // in this case file is stored in memory by multer (can figure out it in the route)
        const image = req.file as Express.Multer.File;
        const base64Image = Buffer.from(image.buffer).toString('base64');
        const dataURI = `data:${image.mimetype};base64,${base64Image}`;

        const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
        const restaurant = new Restaurant(req.body);
        console.log(restaurant)
        restaurant.imageUrl = uploadResponse.url;
        restaurant.user = new mongoose.Types.ObjectId(req.userId);
        await restaurant.save()
        // res.status(201).json({
        //     message: "Restaurant created successfully",
        //     restaurant: restaurant.toObject()
        // })
        res.status(201).send(restaurant);

    } catch (e) {
        console.log(e)
        res.status(500).json({message: "Something went wrong in create restaurant"});
    }
}


const getRestaurant = async (req: Request, res: Response) => {
    try {
        const restaurant = await Restaurant.findOne({user: req.userId})
        if (!restaurant) {
            return res.status(404).json({message: "Cannot find the restaurant"})
        }
        res.json(restaurant)
    } catch (e) {
        console.log("error in get restaurant", e)
        res.status(500).json({message: "Error fetching restaurant"})
    }
}

export default {
    createRestaurant,
    getRestaurant
}