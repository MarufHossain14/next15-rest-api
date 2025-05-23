import {Schema, model, models} from "mongoose";
import { userAgent } from "next/server";

const BlogSchema = new Schema(
    {
        title: {type: "string", required: true},
        desciption: {type: "string" },
        user: {type: Schema.Types.ObjectId, ref: "User"},
        category: {type: Schema.Types.ObjectId, ref: "Category"},
    },
    {
        timestamps: true,
    }
);

const Blog = models.Blog || model("Blog", BlogSchema);
export default Blog;