const mongoose = require('mongoose');
const Balances = require('../model/Balances');
const Users = require('../model/Users');
const Transactions = require('../model/Transactions');

const getAllTransactions = async (req, res) => {
    const email = req.email;

    // Query Params
    let { limit, offset } = req.query;

    console.log(limit, offset);
    if (!limit) limit = 10;
    if (!offset) offset = 0;


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
    if (isNaN(amount) || amount <= 0) {
        return res.status(400).json({ 'error': 'Invalid amount.' });
    }

    // Check if the reciever exists
    let isRecieverFound = await Users.findOne({ email: reciever });
    if (!isRecieverFound) {
        return res.status(400).json({ 'error': 'Reciever email does not exist.' });
    }

    // Check if the sender has enough balance
    let senderBalance = (await Balances.findOne({ email: sender })).balance;
    if (senderBalance < amount) {
        return res.status(400).json({ 'error': 'Insufficient balance.' });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Update sender's balance
        senderBalance -= amount;
        await Balances.findOneAndUpdate({ email: sender }, { balance: senderBalance }, { session });

        // Update reciever's balance
        let recieverBalance = (await Balances.findOne({ email: reciever })).balance;
        recieverBalance += amount;
        await Balances.findOneAndUpdate({ email: reciever }, { balance: recieverBalance }, { session });

        // Add Transaction to Database
        const newTransaction = new Transactions({
            sender: sender,
            reciever: reciever,
            amount: amount,
        });

        await newTransaction.save({ session });

        // Commit the transaction
        await session.commitTransaction();
        return res.status(200).json({ 'success': 'Transaction succeeded.' });

    } catch (error) {
        await session.abortTransaction();
        console.error('Transaction error: ', error);
        return res.status(500).json({ 'error': 'Transaction failed.' });
    } finally {
        session.endSession();
    }
};

module.exports = {
    send,
    getAllTransactions,
};


