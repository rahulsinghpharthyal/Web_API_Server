import { Router } from 'express';
import { addEmployeePicture, createEmployee, deleteEmployee, getAllEmployee, updateEmployee } from '../controllers/employeeController.js';
import { upload } from '../middlewares/multerConfilg.js';

const router = Router();

router.post('/upload-picture', upload, addEmployeePicture);
router.post('/create-employee', createEmployee);
router.put('/update-employee/:id', upload, updateEmployee);
router.get('/get-employee', getAllEmployee);
router.delete('/delete-employee/:id', deleteEmployee);

export default router;