import mongoose from 'mongoose';
import validator from 'validator';

const employeeSchema = new mongoose.Schema({
    employeeName: {
        type: String,
        required: [true, 'Employee name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'Please provide a valid email address'
        }
    },
    mobileNumber: {
        type: Number,
        required: [true, 'Mobile number is required'],
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v);
            },
            message: 'Please provide a valid 10-digit mobile number'
        }
    },
    
    designation: {
        type: String,
        enum: ['HR', 'Manager', 'Sales'],
        default: 'HR',
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        default: 'Male'
    },
    course: {
        type: String,
        enum: ['MCA', 'BCA', 'BSC'],
        default: 'MCA'
    },
    imageURI: {
        type: String,
        validate: {
            validator: function(v) {
                return /\.(jpg|jpeg|png)$/i.test(v);
            },
            message: 'Only JPG, JPEG, and PNG files are allowed'
        }
    }
}, { timestamps: true });

// Model creation
const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
