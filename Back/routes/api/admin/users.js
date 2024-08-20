/* const express = require('express');
const router = express.Router();
const getUsersController = require('../../../controllers/getUsersController');
const verifyJWT = require('../../../middleware/verifyJWT');
const verifyRole = require('../../../middleware/veryifyRole');


router.route('/')
    .get(verifyJWT, verifyRole('admin'), getUsersController.getAll);

router.route('/:userId')
    .get(verifyJWT, verifyRole('admin'), getUsersController.getById);

module.exports = router;
 */

const Users = require('../../../model/Users');
const createGenericRouter = require('./genericRouter');

module.exports = createGenericRouter(Users);
