import express from 'express';
import { signin, signup, verifyEmail, logout, profilePhotoUpdate } from '../controller/authController.js';
import { profilePhoto } from '../utils/multer.js';

// router config
const router = express.Router();

// auth routes
router.post('/signup', signup);
router.post('/signin', signin);
router.get('/verify-email', verifyEmail);
router.post('/logout', logout);
router.post('/profile-photo-update', profilePhoto, profilePhotoUpdate);

// export router
export default router;
   
 