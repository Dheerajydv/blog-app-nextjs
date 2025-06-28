import { IPost } from "@/types/types";
import mongoose, { Schema, Document } from "mongoose";



const PostSchema: Schema<IPost> = new mongoose.Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
    },
    { timestamps: true }
);

const Post = mongoose.models.Post as mongoose.Model<IPost> || mongoose.model<IPost>("Post", PostSchema);

export default Post;