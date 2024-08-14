const Balances = require('../model/Balances')
const Users = require('../model/Users')
const Transactions = require('../model/Transactions')

const getAllTransactions = async (req, res) => {
    const email = req.email;

    // Query Params
    let { limit, offset } = req.query;

    console.log(limit, offset);
    if(!limit) limit = 10;
    if(!offset) offset = 0;
    

    let doc = await Transactions.find({ $or: [{ sender: email }, { reciever: email }] }).sort({ _id: -1 }).skip(offset).limit(limit);
    let totalElementsItem = await Transactions.countDocuments({ $or: [{ sender: email }, { reciever: email }] });
    let totalPagesItem = Math.ceil(totalElementsItem / limit);

    let data = {
        data: doc,
        totalPages: totalPagesItem
    }

    return res.json(data);
}

const send = async (req, res) => {

    const { reciever, amount } = req.body;
    const sender = req.email;

    if (sender === reciever) {
        return res.status(400).json({ 'error': 'Cannot send money to yourself.' });
    }
    // Check if the amount is valid
    if (amount == NaN || amount <= 0) {
        return res.status(400).json({ 'error': 'Invalid amount.' });
    }

    // Check if the reciever exists
    let isRecieverFound = await Users.findOne({ 'email': reciever });
    if (!isRecieverFound) {
        return res.status(400).json({ 'error': 'Reciever email does not exists.' });
    }

    // Check if the amount is enough
    let senderBalance = (await Balances.findOne({ 'email': sender })).balance;
    if (senderBalance < amount) {
        return res.status(400).json({ 'error': 'Balance not sufficient.' });
    }


    // Change Balances
    senderBalance -= amount;
    await Balances.findOneAndUpdate({ email: sender }, { balance: senderBalance });

    let recieverBalance = (await Balances.findOne({ email: reciever })).balance;
    recieverBalance += amount;
    await Balances.findOneAndUpdate({ email: reciever }, { balance: recieverBalance });


    // Add Transaction to Database
    const newTransaction = {
        "sender": sender,
        "reciever": reciever,
        "amount": amount
    }

    Transactions.create(newTransaction);

    return res.status(200).json({ 'success': 'Transaction succeed.' });
}

module.exports = {
    send,
    getAllTransactions
}