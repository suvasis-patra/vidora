import * as z from "zod";

export const RegisterUserSchema = z.object({
  username: z
    .string({ required_error: "This field is required" })
    .min(1, "This field is required"),
  password: z
    .string({ required_error: "This field is required" })
    .min(1, "This field is required")
    .min(8, "password is too short"),
  email: z
    .string({ required_error: "This field is required" })
    .min(1, "This field is required")
    .email("Enter a vaild email"),
  confirmPassword: z
    .string({ required_error: "This field is required" })
    .min(1, "This field is required")
    .min(8, "password is too short"),
});

export const LoginUserSchema = z.object({
  password: z
    .string({ required_error: "This field is required" })
    .min(1, "This field is required")
    .min(8, "password is too short"),
  email: z
    .string({ required_error: "This field is required" })
    .min(1, "This field is required")
    .email("Enter a vaild email"),
});

export const VideoSchema = z.object({
  title: z
    .string({ required_error: "This field is required!" })
    .min(1, "This field is required!")
    .min(2, "Too short title"),
  description: z
    .string({ required_error: "This field is required!" })
    .min(1, "This field is required!")
    .min(10, "Too short description"),
  videoUrl: z
    .string({ required_error: "This field is required!" })
    .min(1, "This field is required!")
    .url("Enter a valid url"),
});
