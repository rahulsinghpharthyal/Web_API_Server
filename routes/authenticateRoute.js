import { Router } from 'express';
import isAuthenticated from '../middlewares/isAuthenticate.js';
import authenticate from '../controllers/authenticateController.js';

const router = Router();

router.get('/', isAuthenticated, authenticate)

export default router;