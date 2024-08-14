const logout = async (req, res) => {
    if (!req.cookies['jwt']) {
        return res.status(400).json({ "error": "User is already logged out." })
    }

    res.clearCookie("jwt");
    return res.json({ "success": "Successfully logged out." });
}

module.exports = {
    logout
}