import { Request, Response } from "express";

import cloudinary from "../utils/cloudinary";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

export const cloudinarySignature = asyncHandler(
  async (_: Request, res: Response) => {
    const timestamps = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      { timestamps, folder: "demo_video" },
      process.env.CLOUDINARY_API_SECRET!
    );

    res.status(200).json(
      new ApiResponse(200, {
        signature,
        timestamps,
        apiKey: process.env.CLOUDINARY_API_KEY,
        folder: "demo_video",
        cloudname: process.env.CLOUDINARY_CLOUD_NAME,
      })
    );
  }
);
