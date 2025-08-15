import express from 'express';
import UserController from "../controllers/UserController";

const router = express.Router();

// api/my/user
router.post("/", UserController.createUser);

export default router;