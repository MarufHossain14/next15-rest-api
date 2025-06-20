import connect from "@/lib/db";
import User from "@/lib/models/user";
import Category from "@/lib/models/category";
import { NextResponse } from "next/server";
import { Types } from "mongoose";
import Blog from "@/lib/models/blog";

/**
 * Handles GET requests to fetch blogs filtered by user, category, keywords, and date range.
 *
 * @param request - The incoming HTTP request object.
 * @returns A `NextResponse` containing the filtered list of blogs or an error message.
 *
 * @remarks
 * - Requires valid `userId` and `categoryId` query parameters (must be valid MongoDB ObjectIds).
 * - Optional query parameters:
 *   - `Keywords`: Search string to match against blog titles and descriptions (case-insensitive).
 *   - `startDate` and/or `endDate`: Filter blogs by creation date range.
 *   - `page`: Page number for pagination (defaults to 1).
 *   - `limit`: Number of blogs per page (defaults to 10).
 * - Returns 400 if user or category is invalid or not found.
 * - Returns 200 with the list of blogs on success.
 * - Returns 500 on server/database errors.
 */

export const GET = async (request: Request) => {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");
        const categoryId = searchParams.get("categoryId");
        const searchKeywords = searchParams.get("Keywords") as string;
        const startDate = searchParams.get("startDate");
        const endDate = searchParams.get("endDate");
        const page: any = parseInt(searchParams.get("page") || "1");;
        const limit: any = parseInt(searchParams.get("limit") || "10");

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

        const filter: any = {
            user: new Types.ObjectId(userId),
            category: new Types.ObjectId(categoryId),   
        };

        if (searchKeywords) {
            filter.$or = [
                { title: { $regex: searchKeywords, $options: "i" } },
                { desciption: { $regex: searchKeywords, $options: "i" } },
            ];
        }

        if (startDate && endDate) {
            filter.createdAt = {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            };
        } else if (startDate) {
            filter.createdAt = {
                $gte: new Date(startDate),
            };
        } else if (endDate) {
            filter.createdAt = {
                $lte: new Date(endDate),
            };
        }
        
        const skip = (page - 1) * limit;

        const blogs = await Blog.find(filter).sort({ createdAt: "asc"}).skip(skip).limit(limit);

        return new NextResponse(JSON.stringify(blogs), {
            status: 200,
        });
    } catch (error: any) {
            return new NextResponse("Error in fetching blogs" + error.message, {
                status: 500,
            });
        }
    };

export const POST = async (request: Request) => {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");
        const categoryId = searchParams.get("categoryId");
        const body = await request.json();
        const { title, desciption } = body;

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

        const newBlog = new Blog({
            title,
            desciption,
            user: new Types.ObjectId(userId),
            category: new Types.ObjectId(categoryId),
        });
        
        await newBlog.save();
        return new NextResponse(
            JSON.stringify({ message: "Blog created successfully", blog: newBlog }),
            {
                status: 201,
            }
        );

    } catch (error: any) {
        return new NextResponse("Error in creating blog" + error.message, { 
            status: 500,
        });
    }
};

