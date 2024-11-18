import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import User from "../model/userSchema.js";

const authenticate = catchAsyncErrors(async (req, res, next) => {
    const {_id} = req.user;
    console.log(_id)
    const existingUser = await User.findOne({_id: _id});
    if(!existingUser) return next(new ErrorHandler('Invalid UserName and Password', 404))
    return res.status(200).json({success: true, Data: existingUser})
});

export default authenticate;
