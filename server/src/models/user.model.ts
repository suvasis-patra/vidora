import { Document, model, Schema, ObjectId } from "mongoose";

import { hashPassword } from "../utils";

interface UserRegistration extends Document {
  _id: ObjectId;
  username: string;
  email: string;
  password: string;
  uploadedVideos: ObjectId[];
}

const UserRegistrationSchema = new Schema<UserRegistration>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    uploadedVideos: [{ type: Schema.Types.ObjectId, ref: "Video" }],
  },
  { timestamps: true }
);

UserRegistrationSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await hashPassword(this.password);
  next();
});

export const User = model<UserRegistration>("User", UserRegistrationSchema);
