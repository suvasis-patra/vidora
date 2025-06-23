import { Router } from "express";
import { authorizeUser } from "../middlewares/auth.middleware";
import { getVideos, uploadVideo } from "../controllers/video.controller";
import { cloudinarySignature } from "../controllers/cloudinary.controller";

const router = Router();

// protected routes
router.route("/get-signature").get(authorizeUser, cloudinarySignature);
router.route("/upload").post(authorizeUser, uploadVideo);
router.route("/videos").post(authorizeUser, getVideos);

export default router;
