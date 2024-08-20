const Balances = require('../../../model/Balances');
const createGenericRouter = require('./genericRouter');

module.exports = createGenericRouter(Balances);
