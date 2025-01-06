

const EmployessModel = require("../model/employessModel")


const Method = require("../extra/Method");
const bcrypt = require("bcrypt");

const Registration = async (req, res) => {
    try {
    
        const {username, email, password} = req.body;
        const existEmployess = await EmployessModel.findOne({email: email});

        if (!existEmployess) {
            const caption = new EmployessModel({
                username : username,
                email: email,
                password: await Method.strongPassword(password), 
                verify : email === "ravalrudresh482@gmail.com" ? true : false,
                role : email === "ravalrudresh482@gmail.com" ? "admin" : "user" 
            });
            const saveEmployess = await caption.save();
            const token = await Method.generateToken(saveEmployess._id);
            res.status(200).json({success: true, message: "Employess Registered successfully and Wait Verification", data: saveEmployess, token});
        } else {
            res.status(200).json({success: true, message: "Employess Already exists"});
        }
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
};

const Login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const employess = await EmployessModel.findOne({email: email}).select("+password")
        if(employess.verify === true){
            if (employess) {
                const comparePassword = await bcrypt.compare(password, employess.password)
                if(comparePassword){
                    const token = await Method.generateToken(employess._id)
                    res.cookie('token',token)
                    res.status(200).json({success:true,message:"login successfully",employess,token})
                }else{
                    res.status(401).json({success: false, message: "password not match"});
                }
            } else {
                res.status(401).json({success: false, message: "employess not match"});
            }
        }else{
                res.status(404).json({success: false, message: "Employess are not Verify"})
        }
       
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

const userPermission = async(req,res) =>{
    try{
        const admin = req.user
        const {_id} = req.body
        const employess = await EmployessModel.findOne({_id : _id})
        if(admin[0].role === 'admin'){
            if(employess){
                if(employess.verify === false){
                    await EmployessModel.updateOne({_id : employess._id},{$set : {verify : true}})
                    res.status(200).json({success:true,message : "Verify success you can login"})
                }else{
                    await EmployessModel.updateOne({_id : employess.id},{$set : {verify : false}})
                    res.status(200).json({success:true,message : "Verify false You can not login"})
                }
            }else{
                res.status(404).json({success: false, message: "Employess not found"})
            }
           
        }else{
            res.status(404).json({success:false,message : "You are not Admin to not permission to verification"})
        }
       
        
    }catch(error){
        res.status(500).json({success: false, message: error.message})
    }
    
}


module.exports = {
    Registration,
    Login,
    userPermission
}