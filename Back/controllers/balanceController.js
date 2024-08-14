const Balances = require("../model/Balances");

const balance = async (req, res) => {

    const foundUser = await Balances.findOne({ 'email': req.email });

    if (!foundUser) {
        return res.json({ "error": "Failed to retrieve balance." })
    }
    return res.json({ "success": "Balance retireved.", "amount": foundUser.balance });
}

module.exports = {
    balance
}