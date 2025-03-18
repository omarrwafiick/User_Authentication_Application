const express = require('express'); 
const { VerifyToken } = require('../middlewares/verifyToken'); 
const { SignUp, SignIn, VerifyEmail, ForgetPassword, ResetPassword, LogOut, CheckAuth } = require('../controllers/auth.controller'); 
const router = express.Router();

router.get('/check-auth', VerifyToken, CheckAuth);

router.post('/signup', SignUp);
 
router.post('/verify-email', VerifyEmail);

router.post('/signin', SignIn); 

router.post('/forget-password', ForgetPassword);

router.post('/reset-password/:token', ResetPassword);

router.post('/logout', LogOut);

module.exports = router;