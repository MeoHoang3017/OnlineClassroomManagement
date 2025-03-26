const express = require('express');
const { sendRegisterOtp, sendForgotPasswordOtp, verifyOtp, verifyForgotPasswordOtp, getAllOtp } = require('../controllers/otpController');

const router = express.Router();

// Route for sending registration OTP
router.post('/send-register-otp', sendRegisterOtp);

// Route for sending forgot password OTP
router.post('/send-forgot-password-otp', sendForgotPasswordOtp);

// Route for verifying OTP
router.post('/verify-otp', verifyOtp);

// Route for verifying forgot password OTP
router.post('/verify-forgot-password-otp', verifyForgotPasswordOtp);

// Route for getting all OTPs
router.get('/all-otp', getAllOtp);

module.exports = router;
