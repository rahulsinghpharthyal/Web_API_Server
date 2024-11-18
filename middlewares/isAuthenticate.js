import { catchAsyncErrors } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;
    console.log(token);
    if (!token) return next(new ErrorHandler("Please Login to access", 401));
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
    console.log(decoded)
    const { _id } = decoded;
    req.user = { _id };
    next();
 
});

export default isAuthenticated;
