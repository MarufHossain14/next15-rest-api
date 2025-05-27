import { NextResponse } from "next/server";
import authMiddleware from "./middlewares/api/authMiddleware";

/**
 * Middleware function for handling authentication and logging for incoming requests.
 *
 * - Logs authentication results for requests targeting the `/api/blogs` endpoint.
 * - Checks authentication for all requests using `authMiddleware`.
 * - Returns a 401 Unauthorized response if authentication fails.
 * - Allows the request to proceed if authentication is successful.
 *
 * @param request - The incoming HTTP request object.
 * @returns A `NextResponse` object indicating whether the request is authorized or not.
 */

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