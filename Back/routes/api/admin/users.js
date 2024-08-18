const express = require('express');
const router = express.Router();
const getUsersController = require('../../../controllers/getUsersController');
const verifyJWT = require('../../../middleware/verifyJWT');
const verifyRole = require('../../../middleware/veryifyRole');

router.route('/')
    .get(verifyJWT, verifyRole('admin'), getUsersController.getAll);


module.exports = router;