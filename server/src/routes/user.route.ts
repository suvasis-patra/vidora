import { Router } from "express";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller";
import { authorizeUser } from "../middlewares/auth.middleware";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

// protected route
router.route("/profile").get(authorizeUser, getCurrentUser);
router.route("/logout").get(authorizeUser, logoutUser);

export default router;
