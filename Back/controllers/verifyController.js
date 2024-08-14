const Users = require('../model/Users')
const Balances = require('../model/Balances');

const verify = async (req, res) => {

    const { email, code } = req.body;

    if (!code) {
        return res.status(401).json({ 'error': 'Verification code is required.' });
    }

    const foundUser = await Users.findOne({ 'email': email });
    if (!foundUser) {
        return res.status(200).json({ 'error': 'User does not exists.' });
    }
    if (foundUser.is_activated) {
        return res.status(200).json({ 'success': 'Email is already activated' });
    }

    const match = code == foundUser.verification_code;
    if (match) {
        await Users.findOneAndUpdate({ email: email }, { is_activated: true });

        const newBalance = {
            email: email,
            balance: randomIntFromInterval(100, 1000)
        }
        await Balances.create(newBalance);

        return res.status(200).json({ 'success': 'Email activated.' });
    } else {
        return res.status(401).json({ 'error': 'Wrong verification code.' });
    }
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports = {
    verify
}