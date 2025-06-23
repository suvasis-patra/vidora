import { Request, Response } from "express";

import { ApiError } from "../utils/ApiError";
import { VideoSchema } from "../utils/schema";
import { Video } from "../models/video.model";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

export const uploadVideo = asyncHandler(async (req: Request, res: Response) => {
  const videoInfo = VideoSchema.safeParse(req.body);
  if (!videoInfo.success) {
    throw new ApiError(400, "Invalid video information");
  }
  const { description, title, videoUrl } = videoInfo.data;
  const video = await Video.create({ description, title, videoUrl });
  if (!video) {
    throw new ApiError(400, "Failed to upload video");
  }
  res
    .status(201)
    .json(
      new ApiResponse<{ video_url: string }>(201, { video_url: video.videoUrl })
    );
});

export const getVideos = asyncHandler(async (req: Request, res: Response) => {
  const videos = await Video.find();
  res.status(200).json(new ApiResponse(200, { videos }));
});

export const videoRecommendation = asyncHandler(
  async (_: Request, res: Response) => {
    const videos = await Video.aggregate([{ $sample: { size: 5 } }]);
    res.status(200).json(new ApiResponse(200, { videos }));
  }
);
