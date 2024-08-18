const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {

   /*  console.log("Cookies: ", req.cookies['jwt']); */

    const token = req.cookies['jwt'];
    if (!token) return res.sendStatus(401);
    
    
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            /* console.log("Decoded", decoded); */
            if (err) return res.sendStatus(403); //invalid token (Forbidden)
            req.email = decoded.email;
            req.role = decoded.role;
            next();
        }
    );
}

module.exports = verifyJWT