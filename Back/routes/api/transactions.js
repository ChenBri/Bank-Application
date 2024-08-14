const express = require('express');
const router = express.Router();
const transactionsController = require('../../controllers/transactionsController');
const verifyJWT = require('../../middleware/verifyJWT');

router.route('/')
    .get(verifyJWT, transactionsController.getAllTransactions)
    .post(verifyJWT, transactionsController.send)


module.exports = router;