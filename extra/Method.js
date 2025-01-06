const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
class Method {

    constructor(){
        
    }

    generateToken = async(id) =>{
        const token = jwt.sign({_id: id}, process.env.JWT_SECRETE,{expiresIn : '24h'});
        return token;
    }
    strongPassword = async (password) => {
        const hashPassword = await bcrypt.hash(password, 10);
        return hashPassword;
    }

}


const method = new Method()

module.exports = method