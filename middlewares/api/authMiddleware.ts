// i am mimicking the above code to create a middleware for authMiddleware.ts
// i am not going to create a login page 
// basically mimicking the real bearer token authentication
// i am going to create a middleware that checks if the user is authenticated
// and if the user is not authenticated, it will redirect to the login page

const validate = (token: any) => {
    const validToken = true;
    if (!validToken || !token) {
        return false;
    }
    return true;
};

export default function middleware(req: Request): any {
    const token = req.headers.get("Authorization")?.split(" ")[1];

    return {isValid: validate(token) };
        
    
       
}