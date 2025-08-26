import {body, validationResult} from "express-validator";
import {Request, Response, NextFunction} from "express";

const handleValidationErrors = async (req: Request, res: Response, next: NextFunction) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    next();
}


export const validateUserRequest = [
    body("name").isString().notEmpty().withMessage("Name is required"),
    body("addressLine1").isString().notEmpty().withMessage("Address Line 1 must be a string"),
    body("city").isString().notEmpty().withMessage("City must be a string"),
    body("country").isString().notEmpty().withMessage("Country must be a string"),
    handleValidationErrors
]

export const validateRestaurantRequest = [
    body("restaurantName").isString().notEmpty().withMessage("Restaurant name is required"),
    body("city").isString().notEmpty().withMessage("City must be a string"),
    body("country").isString().notEmpty().withMessage("Country must be a string"),
    body("deliveryPrice").isFloat({min: 0}).withMessage("Delivery price must be a number"),
    body("estimateDeliveryTime").isFloat({min: 0}).withMessage("Estimate delivery time must be a number"),
    body("cuisines").isArray().notEmpty().withMessage("Cuisines must be a non-empty array of strings"),
    body("menuItems").isArray().withMessage("Menu items must be an array"),
    body("menuItems.*.name").isString().notEmpty().withMessage("Menu item name is required"),
    body("menuItems.*.price").isFloat({min: 0}).notEmpty().withMessage("Menu item price is required"),
    body("imageUrl").isString().notEmpty().withMessage("Image image is required"),
    handleValidationErrors
]