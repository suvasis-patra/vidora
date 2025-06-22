import { Document, model, Schema, ObjectId } from "mongoose";

interface IVideo extends Document {
  _id: ObjectId;
  title: string;
  description: string;
  videoUrl: string;
  uploadedBy: ObjectId;
}

const VideoSchema = new Schema<IVideo>(
  {
    title: {
      type: String,
      required: true,
      minlength: 2,
    },
    description: {
      type: String,
      required: true,
      minlength: 10,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    uploadedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const Video = model<IVideo>("Video", VideoSchema);
