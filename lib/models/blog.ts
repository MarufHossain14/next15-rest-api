import {Schema, model, models} from "mongoose";
import { userAgent } from "next/server";

/**
 * Defines the schema for a Blog document.
 *
 * @property {string} title - The title of the blog post. This field is required.
 * @property {string} [desciption] - The description of the blog post. (Note: "desciption" may be a typo for "description".)
 * @property {ObjectId} user - Reference to the User who authored the blog post.
 * @property {ObjectId} category - Reference to the Category associated with the blog post.
 * @property {Date} createdAt - Timestamp indicating when the blog post was created.
 * @property {Date} updatedAt - Timestamp indicating when the blog post was last updated.
 */

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