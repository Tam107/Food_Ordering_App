import express from 'express';
import {param} from "express-validator";
import RestaurantController from "../controllers/RestaurantController";

const router = express.Router();

router.get("/search/:city", param("city")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Please enter a city"), RestaurantController.searchRestaurant)

export default router;