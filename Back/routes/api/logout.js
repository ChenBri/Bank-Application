const express = require('express');
const router = express.Router();
const logoutController = require('../../controllers/logoutController');
const verifyJWT = require('../../middleware/verifyJWT');

router.route('/')
    .delete(verifyJWT, logoutController.logout);


module.exports = router;