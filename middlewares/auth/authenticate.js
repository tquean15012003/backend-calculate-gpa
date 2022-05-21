const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.header("token");
    try {
        const decode = jwt.verify(token, "calculate-gpa-harry-tran");
        if (decode) {
            req.user = decode;
            next();
        } else {
            res.status(401).send("Haven't logged in yet!!");
        }
    } catch (error) {
        res.status(401).send("Haven't logged in yet!!");
    }
}

module.exports = {
    authenticate
}