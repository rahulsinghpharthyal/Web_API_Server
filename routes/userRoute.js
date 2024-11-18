import {Router} from 'express';
import { creatUser, loginUser, logout } from '../controllers/userController.js';

const router = Router();

router.post('/create-user', creatUser);
router.post('/login', loginUser);
router.get('/logout', logout);



export default router;