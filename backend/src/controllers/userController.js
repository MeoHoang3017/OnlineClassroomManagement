const { User } = require('../models/index');
const { hashPassword, isMatch } = require('../utils/Hasher');

//Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Get user by id
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Create a new user
const createUser = async (req, res) => {
    try {
        const { username, fullname, email, phone, password, role } = req.body;
        if (!username || !fullname || !email || !phone || !password || !role) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        if (await User.findOne({ username })) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        if (await User.findOne({ email })) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const hashedPassword = await hashPassword(password);
        const user = await User.create({ username, fullname, email, phone, password: hashedPassword, role });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Update a user
const updateUser = async (req, res) => {
    try {
        const { username, fullname, email, phone, password, role } = req.body;
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (username) user.username = username;
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phone) user.phone = phone;
        if (password) user.password = await hashPassword(password);
        if (role) user.role = role;
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Delete a user
const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const response = {
            id: user._id,
            username: user.username,
            fullname: user.fullname,
            email: user.email,
            role: user.role
        };
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser, getUserInfo };