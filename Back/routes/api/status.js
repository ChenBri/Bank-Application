const express = require('express');
const router = express.Router();
const statusController = require('../../controllers/statusController');

router.route('/')
    .get(statusController.status);


module.exports = router;