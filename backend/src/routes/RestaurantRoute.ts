import express from "express";
import multer from "multer";
import RestaurantController from "../controllers/RestaurantController";
import {jwtCheck, jwtParse} from "../middleware/auth";
import {validateRestaurantRequest} from "../middleware/validation";

const router = express.Router();

// storage for multer (in-memory)
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {fileSize: 5 * 1024 * 1024}, // 5MB limit
})
// api/restaurant
router.post("", validateRestaurantRequest, jwtCheck, jwtParse, upload.single('imageFile'),
    RestaurantController.createRestaurant);

export default router;