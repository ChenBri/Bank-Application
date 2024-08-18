const bcrypt = require('bcrypt');
const Users = require('../model/Users');

const register = async (req, res) => {

    const { email, password, phone } = req.body;

    if (!email || !password || !phone) {
        return res.status(400).json({ 'error': 'All fields are required.' });
    }

    const duplicateEmail = await Users.findOne({ 'email': email });
    const duplicatePhone = await Users.findOne({ 'phone': phone });

    if (duplicateEmail) {
        return res.status(400).json({ 'error': "Email already registered!" });
    }
    if (duplicatePhone) {
        return res.status(400).json({ 'error': "Phone number already in use." });
    }

    // Add new user to Database
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = {
        email: email,
        password: hashPassword,
        is_activated: true,
        phone: phone,
        role: 'admin'
    }

    await Users.create(newUser);

    return res.status(200).json({ 'success': `Admin user was created!` });
}

const verifyKey = async (req, res, next) => {

    const { adminKey } = req.body;
    if (!adminKey || adminKey != process.env.ADMIN_KEY) {
        return res.status(404).json({ 'error': `Invalid admin key!` });
    }
    next();
}

module.exports = {
    register,
    verifyKey
}