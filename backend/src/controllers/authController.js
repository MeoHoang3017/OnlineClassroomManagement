const { User, Otp } = require('../models/index');
const { hashPassword, isMatch } = require('../utils/Hasher');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../utils/JwtService');
const logger = require('../config/logger');

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }
        const existingUsername = await User.findOne({
            username: username,
        });
        if (existingUsername) {
            return res.status(400).json({ error: 'Username is already taken' });
        }
        const hashedPassword = await hashPassword(password);
        const user = await User.create({ username, email, password: hashedPassword, role: 'Student' });
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        logger.info(`User ${user.username} registered successfully`);
        res.cookie('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'Strict', maxAge: 60 * 60 * 1000 });
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'Strict', maxAge: 7 * 24 * 60 * 60 * 1000 });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        logger.error(`Error registering user: ${err.message}`);
        res.status(500).json({ error: err.message });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        if (!await isMatch(password, user.password)) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        logger.info(`User ${user.username} logged in`);

        res.cookie('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'Strict', maxAge: 60 * 60 * 1000, expires: new Date(Date.now() + 60 * 60 * 1000) });
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'Strict', maxAge: 7 * 24 * 60 * 60 * 1000, expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
        res.status(200).json({ message: 'Login successful' });
    } catch (err) {
        logger.error(`Error logging in user: ${err.message}`);
        res.status(500).json({ error: err.message });
    }
};

const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({ error: 'Refresh token is required' });
        }

        const decoded = verifyRefreshToken(refreshToken);

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);
        res.cookie('accessToken', newAccessToken, { httpOnly: true, secure: true, sameSite: 'Strict', maxAge: 60 * 60 * 1000, expires: new Date(Date.now() + 60 * 60 * 1000) });
        res.cookie('refreshToken', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'Strict', maxAge: 7 * 24 * 60 * 60 * 1000, expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
        const response = {
            ...user._doc,
            id: user._id,
            _id: undefined,
            password: undefined,
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(403).json({ error });
    }
};

const forgotPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    try {
        const user = await User.findOne({
            email
        });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        if (user.isBan) {
            return res.status(400).json({ message: "User is banned" });
        }

        //Find token in OTP
        const otpEntry = await Otp.findOne({ email: email, type: "forgot-password", isVerified: true });
        if (!otpEntry) {
            return res.status(404).json({ message: 'OTP not found' });
        }

        // Compare the plain token with the hashed token
        const isTokenValid = isMatch(otp, otpEntry.otp);
        if (!isTokenValid) {
            return res.status(400).json({ message: "Invalid or expired token" });
        } else {
            await Otp.findByIdAndDelete(otpEntry.id);
        }

        // Hash the new password
        const hashedPassword = await hashPassword(newPassword);

        // Update user's password and clear the reset token
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};


const logout = (req, res) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(200).json({ message: 'Logout successful' });
};

module.exports = {
    login,
    register,
    refreshToken,
    logout,
    forgotPassword
};
