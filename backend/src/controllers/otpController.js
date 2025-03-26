const { User, Otp } = require('../models/index');
const { sendMail } = require('../utils/Mailer');
const bcrypt = require('bcrypt');

const generateOtp = async () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
    const hashedOtp = await bcrypt.hash(otp, 10); // Hash the OTP
    return { otp, hashedOtp };
};

const sendRegisterOtp = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required.' });
    }

    if (await User.findOne({ email, isBan: false })) {
        return res.status(400).json({ message: 'User already exists.' });
    }

    const { otp, hashedOtp } = await generateOtp();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    try {
        await Otp.create({
            email,
            otp: hashedOtp,
            type: 'register',
            expiresAt,
            isVerified: false
        });

        sendMail(
            email,
            'Mã xác thực đăng ký tài khoản của bạn',
            `Mã xác thực của bạn là: ${otp}. 
            Mã xác thực chỉ có hiệu lực trong vòng 10 phút. Vui lòng không chia sẻ mã này cho người khác.`,
            `<p>Mã xác thực của bạn: ${otp}</p>
            <p>Mã xác thực chỉ có hiệu lực trong vòng 10 phút. Vui lòng không chia sẻ máy cho người khác.</p>`,
            (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                    return res.status(500).json({ message: 'Failed to send OTP email.', error });
                }
                return res.status(200).json({ message: 'OTP sent successfully.', info });
            }
        );
    } catch (err) {
        console.error('Error creating OTP:', err);
        res.status(500).json({ message: 'Failed to create OTP.', error: err });
    }
};

const sendForgotPasswordOtp = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required.' });
    }

    if (!(await User.findOne({ email, isBan: false }))) {
        return res.status(400).json({ message: 'User does not exist.' });
    }

    const otpexists = await Otp.find({ email, type: 'forgot-password' });

    otpexists.forEach(async (otp) => {
        await Otp.findByIdAndDelete(otp.id);
    });

    const { otp, hashedOtp } = await generateOtp();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    try {
        await Otp.create({
            email,
            otp: hashedOtp,
            type: 'forgot-password',
            expiresAt,
            isVerified: false
        });

        sendMail(
            email,
            'Mã xác thực hồi phục mật khẩu của bạn',
            `Mã xác thực của bạn là: ${otp}.
            Mã xác thực chỉ có hiệu lực trong vòng 10 phút. Vui lòng không chia sẻ mã này cho người khác.`,
            `<p>Mã xác thực của bạn: ${otp}</p>
            <p>Mã xác thực chỉ có hiệu lực trong vòng 10 phút. Vui bạn không chia sẻ mã này cho người khác.</p>`,
            (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                    return res.status(500).json({ message: 'Failed to send OTP email.', error });
                }
                return res.status(200).json({ message: 'OTP sent successfully.', info });
            }
        );
    } catch (err) {
        console.error('Error creating OTP:', err);
        res.status(500).json({ message: 'Failed to create OTP.', error: err });
    }
};

const verifyForgotPasswordOtp = async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ message: 'Email and OTP are required.' });
    }

    try {
        const otpEntry = await Otp.findOne({ email: email, type: 'forgot-password', isVerified: false });

        if (!otpEntry) {
            return res.status(404).json({ message: 'OTP not found or already verified.' });
        }

        // Check if the OTP has expired
        if (new Date() > otpEntry.expiresAt) {
            await Otp.destroy({ where: { id: otpEntry.id } }); // Delete expired OTP    
            return res.status(400).json({ message: 'OTP has expired.' });
        }

        // Compare the OTP
        const isMatch = await bcrypt.compare(otp, otpEntry.otp);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid OTP.' });
        }

        // Mark as verified
        otpEntry.isVerified = true;
        await otpEntry.save();

        return res.status(200).json({ message: 'OTP verified successfully.' });
    } catch (err) {
        console.error('Error verifying OTP:', err);
        res.status(500).json({ message: 'Failed to verify OTP.', error: err });
    }
}
const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ message: 'Email and OTP are required.' });
    }

    try {
        const otpEntry = await Otp.findOne({ email: email, type: 'register', isVerified: false });

        if (!otpEntry) {
            return res.status(404).json({ message: 'OTP not found or already verified.' });
        }

        // Check if the OTP has expired
        if (new Date() > otpEntry.expiresAt) {
            await Otp.destroy({ where: { id: otpEntry.id } }); // Delete expired OTP
            return res.status(400).json({ message: 'OTP has expired.' });
        }

        // Compare the OTP
        const isMatch = await bcrypt.compare(otp, otpEntry.otp);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid OTP.' });
        }

        //Mark as verified
        otpEntry.isVerified = true;
        await otpEntry.save();

        res.status(200).json({ message: 'OTP verified successfully.' });
    } catch (err) {
        console.error('Error verifying OTP:', err);
        res.status(500).json({ message: 'Failed to verify OTP.', error: err });
    }
};

const getAllOtp = async (req, res) => {
    try {
        const otps = await Otp.find();
        res.status(200).json(otps);
    } catch (err) {
        console.error('Error fetching OTPs:', err);
        res.status(500).json({ message: 'Failed to fetch OTPs.', error: err });
    }
}
module.exports = {
    sendRegisterOtp,
    sendForgotPasswordOtp,
    verifyOtp,
    verifyForgotPasswordOtp,
    getAllOtp
};
