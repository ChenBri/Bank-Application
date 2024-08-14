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
    const random6Digits = Math.floor(100000 + Math.random() * 900000);

    const newUser = {
        email: email,
        password: hashPassword,
        phone: phone,
        verification_code: random6Digits,
        is_activated: false
    }

    await Users.create(newUser);

    // Send email
    const sendEmail = require('../utils/emailUtils');
    await sendEmail(email, random6Digits);

    return res.status(200).json({ 'success': `${email} has been registered!` });
}

module.exports = {
    register
}