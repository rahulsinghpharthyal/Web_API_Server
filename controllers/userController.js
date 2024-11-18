import bcrypt from 'bcrypt';
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import User from "../model/userSchema.js";
import jwt  from 'jsonwebtoken';


export const creatUser = catchAsyncErrors(async(req, res, next)=>{
    const {username, email, password} = req.body;
    if(!(username && email && password)) return next(new ErrorHandler('Please Provide All Fields', 400));
    const existingUserEmail = await User.findOne({email});
    if(existingUserEmail) return next (new ErrorHandler('User Alreday Register! Please Try to Login'));
    const existingUserName = await User.findOne({username});
    if(existingUserName) return next (new ErrorHandler('User Alreday Register! Please Try to Login'));

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
        username,
        email,
        password: hashedPassword
    })
    return res.status(200).json({success: true, message: "User Registered"});
});

export const loginUser = catchAsyncErrors(async(req, res, next) => {
    const {username, password} = req.body;
    if(!(username && password)) return next(new ErrorHandler('Please Provide all Fields', 400));
    
    const findUser = await User.findOne({username});
    if(!findUser) return next(new ErrorHandler('Please Register First User Name Not Found!', 400));

    const comparePassword = await bcrypt.compare(password, findUser?.password);
    if(!comparePassword) return next(new ErrorHandler('Please Enter Valid UserName and Password', 400));

    const { password: hashPassword, ...userData } = findUser._doc;

    const AccessToken = jwt.sign(
        {_id: findUser._id},
        process.env.JWT_ACCESS_TOKEN,
        {expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES}
    );
    const options = {
        expires: new Date(
          Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      };
      return res.cookie("token", AccessToken, options).status(200).json({
        success: true,
        Data: { ...userData, accessToken: AccessToken},
        message: "User Login Succesfully",
      });
})

export const logout = catchAsyncErrors((req, res, next) => {
    return res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .json({ success: true, message: "User LoggedOut" });
  });
