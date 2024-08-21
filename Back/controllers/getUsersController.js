const Users = require('../model/Users');

const getAll = async (req, res) => {
    try {
        const foundUsers = await Users.find();
        if (!foundUsers || foundUsers.length === 0) {
            return res.status(404).json({ error: "No users found" });
        }
        return res.status(200).json({ success: "Users retrieved", users: foundUsers });
    } catch (err) {
        return res.status(500).json({ error: "Failed to retrieve users" });
    }
};

const getById = async (req, res) => {
    try {
        const userId = req.params.userId;
        const foundUser = await Users.find().skip(userId - 1).limit(1);

        if (!foundUser || foundUser.length == 0) {
            return res.status(404).json({ error: `User with ID ${userId} not found` });
        }
        return res.status(200).json({ success: "User retrieved", user: foundUser });
    } catch (err) {
        return res.status(500).json({ error: "Failed to retrieve user" });
    }
};

module.exports = {
    getAll,
    getById
};
