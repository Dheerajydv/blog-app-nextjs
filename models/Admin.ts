import mongoose, { Schema } from "mongoose";
import Post from "./Blog";
import { IAdmin } from "@/types/types";

const AdminSchema: Schema<IAdmin> = new Schema({
    email: { type: String, required: true },
    posts: [
        { type: Schema.Types.ObjectId, ref: "Post" }
    ]
});

const Admin = mongoose.models.Admin as mongoose.Model<IAdmin> || mongoose.model<IAdmin>("Admin", AdminSchema);

export default Admin;