import express from 'express';
import UserController from "../controllers/UserController";
import {jwtCheck, jwtParse} from "../middleware/auth";
import {validateUserRequest} from "../middleware/validation";

const router = express.Router();

// api/my/user
router.post("/", jwtCheck, UserController.createUser);

router.put("/", jwtCheck, jwtParse, validateUserRequest, UserController.updateUser);

export default router;