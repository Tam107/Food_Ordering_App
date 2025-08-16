import express from 'express';
import UserController from "../controllers/UserController";
import {jwtCheck} from "../middleware/auth";

const router = express.Router();

// api/my/user
router.post("/", jwtCheck, UserController.createUser);

export default router;