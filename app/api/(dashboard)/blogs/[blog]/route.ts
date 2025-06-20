import connect from "@/lib/db";
import User from "@/lib/models/user";
import Category from "@/lib/models/category";
import { NextResponse } from "next/server";
import { Types } from "mongoose";
import Blog from "@/lib/models/blog";

/**
 * Handles GET requests to fetch a specific blog by its ID, user ID, and category ID.
 *
 * Validates the provided `userId`, `categoryId`, and `blogId` from the request parameters and query string.
 * - Returns a 400 response if any of the IDs are missing or invalid.
 * - Checks if the user and category exist in the database.
 * - Searches for the blog matching the provided IDs.
 * - Returns the blog data as a JSON response if found.
 * - Returns appropriate error messages and status codes for not found or invalid cases.
 * - Returns a 500 response in case of unexpected errors.
 *
 * @param request - The incoming HTTP request object.
 * @param context - An object containing route parameters, specifically the blog ID.
 * @returns A `NextResponse` containing the blog data or an error message.
 */

export const GET = async (request: Request, context: {params: any}) => {
    const blogId = context.params.blog;
    try{
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");
        const categoryId = searchParams.get("categoryId");

        if (!userId || !Types.ObjectId.isValid(userId)) {
                    return new NextResponse(JSON.stringify({ message: "Invalid User id" }), {
                        status: 400,
                    });
                }   
                if (!categoryId || !Types.ObjectId.isValid(categoryId)) {
                    return new NextResponse(JSON.stringify({ message: "Invalid Category id" }), {
                        status: 400,
                    });
                }
                if (!blogId || !Types.ObjectId.isValid(blogId)) {
                    return new NextResponse(JSON.stringify({ message: "Invalid blog id" }), {
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
        const category = await Category.findById(categoryId);
        if (!category) {
            return new NextResponse(
                JSON.stringify({ message: "Category not found in the database" }),
                { status: 400 }
            );
        }

        const blog = await Blog.findOne({
            _id: blogId,
            user: userId,
            category: categoryId,   

        });

        if (!blog) {
            return new NextResponse(
                JSON.stringify({ message: "Blog not found in the database" }),
                { status: 400 }
            );
        }

        return new NextResponse(JSON.stringify(blog), {
            status: 200,
        });


    } catch (error: any) {
        return new NextResponse("Error in fetching blogs" + error.message, {
            status: 500,
        });
    }
};

export const PATCH = async (request: Request, context: {params: any}) => {
    const blogId = context.params.blog;
    try{
        const body = await request.json();
        const { title, desciption } = body;

        const { searchParams } = new URL(request.url);

        const userId = searchParams.get("userId");

        if (!userId || !Types.ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({ message: "Invalid User id" }), {
                status: 400,
            });
        }

        if (!blogId || !Types.ObjectId.isValid(blogId)) {
            return new NextResponse(JSON.stringify({ message: "Invalid blog id" }), {
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
        const blog = await Blog.findOne({_id: blogId, user: userId});
        if (!blog) {
            return new NextResponse(
                JSON.stringify({ message: "Blog not found in the database" }),
                { status: 400 }
            );
        }

        const updatedBlog = await Blog.findByIdAndUpdate(
            blogId,
            {
                title,
                desciption,
            },
            { new: true }
        );
        
        return new NextResponse(
            JSON.stringify({ message: "Blog updated successfully", blog: updatedBlog }),
            {
                status: 200,
            }
        );

    } catch (error: any) {
        return new NextResponse("Error in updating blog" + error.message, {
            status: 500,
        });
    }
}

export const DELETE = async (request: Request, context: {params: any}) => {
    const blogId = context.params.blog;
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

        if (!userId || !Types.ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({ message: "Invalid User id" }), {
                status: 400,
            });
        }
        if (!blogId || !Types.ObjectId.isValid(blogId)) {
            return new NextResponse(JSON.stringify({ message: "Invalid blog id" }), {
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
        const blog = await Blog.findOne({_id: blogId, user: userId});
        if (!blog) {
            return new NextResponse(
                JSON.stringify({ message: "Blog not found in the database" }),
                { status: 400 }
            );
        }
        await Blog.findByIdAndDelete(blogId);

        return new NextResponse(
            JSON.stringify({ message: "Blog deleted successfully" }),
            {
                status: 200,
            }
        );

    } catch (error: any) {  
        return new NextResponse("Error in deleting blog" + error.message, {
            status: 500,
        });
    }

}