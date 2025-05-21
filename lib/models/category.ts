import {Schema, model, models} from "mongoose";
import { userAgent } from "next/server";

/**
 * Mongoose schema for the Category model.
 *
 * Represents a category with a unique name and an optional reference to a user.
 *
 * @property {string} name - The unique name of the category. Required.
 * @property {Schema.Types.ObjectId} user - Reference to the User who owns the category.
 * @property {Date} createdAt - Timestamp indicating when the category was created.
 * @property {Date} updatedAt - Timestamp indicating when the category was last updated.
 */
const CategorySchema = new Schema(
    {
        name: {type: "string", required: true, unique: true},
        user: {type: Schema.Types.ObjectId, ref: "User"},
    },
    {
        timestamps: true,
    }
);

const Category = models.Category || model("Category", CategorySchema);
export default Category;