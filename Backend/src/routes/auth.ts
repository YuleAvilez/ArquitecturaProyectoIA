import { Router } from 'express';
import { registerUser, loginUser, forgotPassword, resetPassword } from './../controllers/authController'; 
import { verifyToken } from '../utils/middleware/verifyToken';// Adjust the path as necessary

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

router.get('/surveyPage', verifyToken, (req, res) => {
  res.json({ message: 'Acceso permitido solo con token' });
});
export default router;
