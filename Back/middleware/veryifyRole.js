const verifyRole = (role) => {
    return (req, res, next) => {
        const userRole = req.role;

        if (role == userRole) {
            next();
        } else {
            return res.status(403).json({ message: 'Unauthorized access' });
        }
    };
};

module.exports = verifyRole;