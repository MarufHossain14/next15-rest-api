export function logMiddleware(req: Request) {
    return { response: req.method + " " + req.url };
    // const token = req.headers.get("Authorization")?.split(" ")[1];
    // const validToken = true;
    // if (!validToken || !token) {
    //     return false;
    // }
    // return true;
    // const token = req.headers.get("Authorization")?.split(" ")[1];
    // const validToken = true;
    // if (!validToken || !token) {
    //     return false;
    // }
    // return true;
    // const token = req.headers.get("Authorization")?.split(" ")[1];
    // const validToken = true;
    // if (!validToken || !token) {
    //     return false;
    // }
    // return true;
    // const token = req.headers.get("Authorization")?.split(" ")[1];
    // const validToken = true;
    // if (!validToken || !token) {
    //     return false;
    // }
    // }
}