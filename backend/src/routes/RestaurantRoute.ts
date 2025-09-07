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
router.post("/",upload.single('imageFile'), validateRestaurantRequest, jwtCheck, jwtParse,
    RestaurantController.createRestaurant);

router.get("/", jwtParse, jwtCheck, RestaurantController.getRestaurant)

export default router;