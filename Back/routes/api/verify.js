const express = require('express');
const router = express.Router();
const verifyController = require('../../controllers/verifyController');


router.route('/')
    .put(verifyController.verify)


module.exports = router;