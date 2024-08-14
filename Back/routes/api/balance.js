const express = require('express');
const router = express.Router();
const balanceController = require('../../controllers/balanceController');
const verifyJWT = require('../../middleware/verifyJWT');

router.route('/')
    .get(verifyJWT, balanceController.balance);


module.exports = router;