import { Request, Response } from "express";

import { ObjectId } from "mongoose";
import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { LoginUserSchema, RegisterUserSchema } from "../utils/schema";
import { comparePassword, generateToken } from "../utils";

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    // validate user details
    const userInfo = RegisterUserSchema.safeParse(req.body);
    console.log(userInfo, req.body);
    if (!userInfo.success) {
      throw new ApiError(400, "Invalid user details");
    }
    // parse user data
    const { email, password, username } = userInfo.data;
    // check if the user already exist in DB
    const result = await User.findOne({ email });
    if (result) {
      throw new ApiError(400, "Email already exists!");
    }
    // create a new user
    const user = await User.create({
      username,
      email,
      password,
    });
    res
      .status(201)
      .json(
        new ApiResponse<{ userId: ObjectId }>(
          201,
          { userId: user._id },
          "registered"
        )
      );
  }
);

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  // validate user information
  const userInfo = LoginUserSchema.safeParse(req.body);
  if (!userInfo.success) {
    throw new ApiError(400, "Invalid user details");
  }
  // parse user information
  const { email, password } = userInfo.data;
  // check if the email is correct
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(401, "Invalid credentials!");
  }
  // check if the password is correct
  const isPasswordCorrect = await comparePassword(password, user.password);
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid credentials!");
  }
  // generate the token
  const token = generateToken({ user_id: user._id });
  // set the cookie
  const options = {
    httpOnly: true,
    secure: true,
  };
  res
    .status(200)
    .cookie("accessToken", token, options)
    .json(
      new ApiResponse<{ user_id: ObjectId; token: string }>(200, {
        user_id: user._id,
        token,
      })
    );
});

export const getCurrentUser = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.headers.userId;

    if (!userId) {
      throw new ApiError(401, "Invalid credentials!");
    }

    const user = await User.findById(userId)
      .select("-password")
      .populate("uploadedVideos");
    if (!user) {
      throw new ApiError(401, "User not found!");
    }
    res.status(200).json(new ApiResponse(200, user));
  }
);

export const logoutUser = asyncHandler((_: Request, res: Response) => {
  const options = {
    httpOnly: true,
    secure: true,
  };
  res
    .status(204)
    .clearCookie("accessToken", options)
    .json(new ApiResponse<{}>(204, {}));
});
