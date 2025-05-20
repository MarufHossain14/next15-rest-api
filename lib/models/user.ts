import {Schema, model, models} from "mongoose";

/**
 * Defines the schema for the User model.
 *
 * @property {string} email - The user's email address. Must be unique and is required.
 * @property {string} username - The user's username. Must be unique and is required.
 * @remarks
 * Timestamps for creation and updates are automatically managed.
 */

const UserSchema = new Schema({
    email: {type: "string", required: true, unique: true},
    username: {type: "string", required: true, unique: true}
},
{
    timestamps: true,
}
)

const User = models.User || model("User", UserSchema);

export default User;