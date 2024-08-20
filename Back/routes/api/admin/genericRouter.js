const express = require('express');
const verifyJWT = require('../../../middleware/verifyJWT');
const verifyRole = require('../../../middleware/veryifyRole');
const { genericGetAll, genericGetById } = require('../../../controllers/genericController');

const createGenericRouter = (Model) => {
    const router = express.Router();

    router.route('/')
        .get(verifyJWT, verifyRole('admin'), genericGetAll(Model));

    router.route('/:id')
        .get(verifyJWT, verifyRole('admin'), genericGetById(Model));

    return router;
};

module.exports = createGenericRouter;
