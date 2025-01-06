const jwt = require("jsonwebtoken");
const EmployessModel = require("../model/employessModel");

const checkAuth = async (req, res, next) => {
    const token = req.query.token || req.body.token || req.headers["authorization"] || req.cookies.token

    if (!token) {
        res.status(404).json({message: "Token not Found Unauthorized"});
    } else {
        try {

            const decode = jwt.verify(token, process.env.JWT_SECRETE);
            const user = await EmployessModel.find({_id: decode._id});
            req.user = user;
            return next();
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
}

module.exports = checkAuth
