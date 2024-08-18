const Users = require("../model/Users");

const getAll = async (req, res) => {

    const foundUsers = await Users.find();

    if (!foundUsers) {
        return res.json({ "error": "Failed to retrieve users." })
    }
    return res.json({ "success": "Balance retireved.", "users": foundUsers });
}

module.exports = {
    getAll
}