import {Request, Response} from 'express';
import Restaurant from "../models/restaurant";
import cloudinary from "cloudinary";
import mongoose from "mongoose";

const createRestaurant = async (req: Request, res: Response) => {
    try {
        // one user can create only one restaurant
        console.log("body: ", req.body)
        const existingRestaurant = await Restaurant.findOne({user: req.userId});

        if (existingRestaurant) {
            // 409 is duplicate conflict
            return res.status(409).json({message: "User already has a restaurant"});
        }
        // in this case file is stored in memory by multer (can figure out it in the route)

        const imageUrl = await uploadImage(req.file as Express.Multer.File);
        const restaurant = new Restaurant(req.body);
        restaurant.imageUrl = imageUrl;
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


const updateRestaurant = async (req: Request, res: Response) => {
    try {
        const restaurant = await Restaurant.findOne({
            user: req.userId,
        })
        if (!restaurant) {
            return res.status(404).json({message: "Cannot find the restaurant"})
        }

        restaurant.restaurantName = req.body.restaurantName
        restaurant.city = req.body.city
        restaurant.country = req.body.country
        restaurant.deliveryPrice = req.body.deliveryPrice
        restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime
        restaurant.cuisines = req.body.cuisines
        restaurant.menuItems = req.body.menuItems
        restaurant.lastUpdated = new Date()
        if (req.file) {
            const imageUrl = await uploadImage(req.file as Express.Multer.File);
            restaurant.imageUrl = imageUrl;
        }

        await restaurant.save()
        res.status(201).send(restaurant);
    } catch (e) {
        console.log("Error in update restaurant", e)
        res.status(500).json({message: "Error fetching restaurant"})
    }
}

const uploadImage = async (file: Express.Multer.File) => {
    const image = file;
    const base64Image = Buffer.from(image.buffer).toString('base64');
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;
    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);

    return uploadResponse.url;
}

const searchRestaurant = async (req: Request, res: Response) => {
    try {
        const city = req.params.city;
        const searchQuery = (req.query.searchQuery as string) || ""
        const selectedCuisine = req.query.selectedCuisine as string || ""
        const sortOption = (req.query.sortOption as string) || "lastUpdated"
        const page = parseInt(req.query.page as string) || 1

        let query: any = {}
        query["city"] = new RegExp(city, "i");
        const cityCheck = await Restaurant.countDocuments(query)

        if (cityCheck === 0) {
            return res.status(404).json({
                data: [],
                pagination: {
                    total: 0,
                    page: 1,
                    pages: 1
                }
            })
        }

        if (selectedCuisine) {
            const cuisinesArray = selectedCuisine.split(",").map((cuisine) => new RegExp(cuisine, "i"));
            query["cuisines"] = {$all: cuisinesArray};
        }

        if (searchQuery) {
            const searchRegex = new RegExp(searchQuery, "i");
            query["$or"] = [
                {restaurantName: searchRegex},
                {cuisines: {$in: [searchRegex]}},
            ]
        }

        const pageSize = 10
        const skip = (page - 1) * pageSize;

        const restaurants = await Restaurant.find(query)
            .sort({[sortOption]: 1})
            .skip(skip)
            .limit(pageSize)
            .lean();

        const total = await Restaurant.countDocuments(query);

        const response = {
            data: restaurants,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / pageSize), // 50 results, pageSize -> page 5
            }
        }

        res.status(200).json(response)

    } catch (err) {
        console.log("error in searchRestaurant", err);
        res.status(500).json({message: "Error searching restaurant"})
    }
}

export default {
    createRestaurant,
    getRestaurant,
    updateRestaurant,
    searchRestaurant
}