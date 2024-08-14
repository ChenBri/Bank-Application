const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../model/Users');
require('dotenv').config();

const authenticate = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(401).json({ 'error': 'Email and password are required.' });
    }

    const foundUser = await Users.findOne({ 'email': email });
    if (!foundUser) {
        return res.status(401).json({ 'error': 'Email not registered.' });
    }

    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {

        if (!foundUser.is_activated) {
            return res.json({ "error": "Please verify your email." });
        }

        const accessToken = jwt.sign(
            { "email": foundUser.email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '60m' });

        res.cookie('jwt', accessToken, { httpOnly: true, maxAge: 60 * 60 * 1000 });
        res.json({ "success": "Logged it.", jwt: accessToken });

    } else {
        return res.status(401).json({ 'error': 'Wrong password.' });
    }
}

module.exports = {
    authenticate
}