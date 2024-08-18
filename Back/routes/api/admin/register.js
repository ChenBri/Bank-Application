const express = require('express');
const router = express.Router();
const adminController = require('../../../controllers/adminController');

router.route('/')
    .post(adminController.verifyKey, adminController.register)

module.exports = router;