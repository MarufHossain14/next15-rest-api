import { NextResponse } from "next/server";
import authMiddleware from "./middlewares/api/authMiddleware";

export const config = {
    matcher:
        "/api/:path*",
};
export default function middleware(request: Request) {

    if (request.url.includes("/api/blogs")) {
        const logResult = authMiddleware(request);
        console.log(logResult);
    }

    const authresult = authMiddleware(request);
    if (!authresult.isValid ) {
        return new NextResponse(JSON.stringify({ message: "Unauthorized"}), {
            status: 401,
        });     
    }
    return NextResponse.next();
    
}