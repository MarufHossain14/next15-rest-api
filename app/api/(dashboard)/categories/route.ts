import connect from "@/lib/db";
import User from "@/lib/models/user";
import Category from "@/lib/models/category";
import { NextResponse } from "next/server";
import { Types } from "mongoose";

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if(!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(JSON.stringify({ message: "Invalid User id" }), {
        status: 400,
      });
    }

    await connect();

    const user = await User.findById(userId);

    if (!user) {
      return new NextResponse(
        JSON.stringify({ message: "User not found in the database" }),
        { status: 400 }
      );
    }

    const categories = await Category.find({ user: new Types.ObjectId(userId), });

    return new NextResponse(JSON.stringify(categories),{
        status: 200,   
    });


  } catch (error: any) {

    return new NextResponse("Error in fetching categories" + error.message, {
      status: 500,
    });
}
};

/**
 * Handles the POST request to create a new category for a user.
 *
 * This function expects a `userId` query parameter in the request URL and a JSON body containing a `title` property.
 * It performs the following steps:
 * 1. Validates the `userId` parameter and checks if it is a valid MongoDB ObjectId.
 * 2. Connects to the database.
 * 3. Checks if the user with the given `userId` exists in the database.
 * 4. Creates a new category associated with the user and saves it to the database.
 * 5. Returns appropriate HTTP responses for success or error cases.
 *
 * @param request - The incoming HTTP request object.
 * @returns A `NextResponse` object indicating the result of the operation.
 */

export const POST = async (request: Request) => {
    try {
        const { searchParams} = new URL(request.url);
        const userId = searchParams.get("userId");
        const { title } = await request.json();

        if(!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(JSON.stringify({ message: "Invalid User id" }), {
        status: 400,
      });
    }

    await connect();

    const user = await User.findById(userId);
    if (!user) {
      return new NextResponse(
        JSON.stringify({ message: "User not found in the database" }),
        { status: 400 }
      );
    }

        const newCategory = new Category({
            title,
            user: new Types.ObjectId(userId),
        });

        await newCategory.save();

    }
    catch (error: any) {
        return new NextResponse("Error in creating category" + error.message, {
            status: 500,
        });
    }
};