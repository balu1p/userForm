import express from 'express';
import { getUserData, registerUser } from '../controllers/user.controller.js';
import { authentication } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register',registerUser);
router.get('/getUser', authentication, getUserData)

export default router;