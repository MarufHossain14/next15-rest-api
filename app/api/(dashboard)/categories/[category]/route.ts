import connect from "@/lib/db";
import User from "@/lib/models/user";
import Category from "@/lib/models/category";
import { NextResponse } from "next/server";
import { Types } from "mongoose";

export const PATCH = async (request: Request, context: {params:any}) => {
    const categoryId = context.params.category;
    try{
        const body = await request.json();
        const { title } = body;

        const {searchParams} = new URL(request.url);
        const userId = searchParams.get("userId");

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

        const category = await Category.findOne({_id: categoryId, user: userId})

        if (!category) {
            return new NextResponse(
                JSON.stringify({ message: "Category not found in the database" }),
                { status: 400 }
            );
        }

        const updatedCategory = await Category.findByIdAndUpdate(
            categoryId,
            { title },
            { new: true }
        );

        return new NextResponse(
            JSON.stringify({ message: "Category updated successfully", category: updatedCategory }),
            { status: 200 }
        );
    }
    catch (error: any) {
        return new NextResponse("Error in updating category" + error.message, {
            status: 500,
        });
    }
};

export const DELETE = async (request: Request, context: {params:any}) => {
    const categoryId = context.params.category;
    try{
        const {searchParams} = new URL(request.url);
        const userId = searchParams.get("userId");

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

        const category = await Category.findOne({_id: categoryId, user: userId});

        if (!category) {
            return new NextResponse(
                JSON.stringify({ message: "Category not found in the database" }),
                { status: 400 }
            );
        }

        await Category.findByIdAndDelete(categoryId);

        return new NextResponse(
            JSON.stringify({ message: "Category deleted successfully" }),
            { status: 200 }
        );



    } catch (error: any) {
        return new NextResponse("Error in deleting category" + error.message, {
            status: 500,
        });
    }

}

