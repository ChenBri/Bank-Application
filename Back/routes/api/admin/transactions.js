const Transactions = require('../../../model/Transactions');
const createGenericRouter = require('./genericRouter');

module.exports = createGenericRouter(Transactions);
