const Users = require('../model/Users');

module.exports = async function removeUnverifiedUsers(){
    await Users.deleteMany({is_activated: false});
    console.log("Database-Cleanup");
}
