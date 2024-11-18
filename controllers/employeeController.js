import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { uploadDocuments } from "../middlewares/multerConfilg.js";
import Employee from "../model/employeeSchema.js";


export const addEmployeePicture = catchAsyncErrors(async(req, res, next)=>{
  const file = req.file;
  if(!file) return next(new ErrorHandler('No File Uploaded', 400));
  const result = await uploadDocuments(file.buffer);
  if(!result) return next(new ErrorHandler('Image not Uploaded', 400));
  return res.status(200).json({success: true, message: 'Image uploaded Successfully', Data: result});
})

export const createEmployee = catchAsyncErrors(async (req, res, next) => {
  const { employeeName, email, mobileNumber, designation, gender, course, imageURI} = req.body;
  console.log(req.body);

  if (!(employeeName || email || mobileNumber || designation || gender || course || imageURI ))
    return next(new ErrorHandler("Please Provide All feilds", 400));
  const existingEmail = await Employee.findOne({ email });
  if (existingEmail)
    return next(
      new ErrorHandler("Email Already Register! Enter Other Email", 400)
    );
  await Employee.create({
    employeeName,
    email,
    mobileNumber,
    designation, 
    gender, 
    course, 
    imageURI
  });
  return res.status(201).json({ success: true, message: "Employee Created" });
});

export const updateEmployee = catchAsyncErrors(async (req, res, next) => {
  console.log(req.params.id)  
  console.log(req.body);
  const { employeeName, email, mobileNumber, designation, gender, course, imageURI } = req.body;

  const employee = await Employee.findById(req.params.id);
  if (!employee) return next(new ErrorHandler("Employee not found", 404));

  if (email && email !== employee.email) {
    const existingEmail = await Employee.findOne({ email });
    if (existingEmail)
      return next(
        new ErrorHandler("Email already registered! Enter another email", 400)
      );
  }
  const updateData = {
    employeeName: employeeName || employee.employeeName,
    email: email || employee.email,
    mobileNumber: mobileNumber || employee.mobileNumber,
    designation: designation || employee.designation,
    gender: gender || employee.gender,
    course: course || employee.course,
    imageURI: imageURI || employee.imageURI,
  };

  const updatedEmployee = await Employee.findByIdAndUpdate(
    req.params.id,
    { $set: updateData },
    {
      new: true,
      runValidators: true,
    }
  );
  console.log(updateEmployee)

  return res
    .status(200)
    .json({
      success: true,
      message: "Employee updated",
      Data: updatedEmployee,
    });
});

export const deleteEmployee = catchAsyncErrors(async(req, res, next)=>{
  const {id} = req.params;
  const existingEmployee = await Employee.findById({_id: id});
  if(!existingEmployee) return next(new ErrorHandler("Employee Not Found", 400));
  await Employee.findByIdAndDelete({_id: id});
  return res.status(200).json({success: true, message: 'Employee Deleted'});
})

export const getAllEmployee = catchAsyncErrors(async (req, res, next) => {
  const getAllEmployee = await Employee.find();
  return res.status(200).json({success: true, Data: getAllEmployee});
});
