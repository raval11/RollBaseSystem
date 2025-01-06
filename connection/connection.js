const mongoose = require("mongoose")

const connectDatabase = () =>{
    mongoose.connect(process.env.DB_CONNECT).then(()=>{
        console.log("Database connection established")
    }).catch((error)=>console.log(error.message))
}

module.exports = connectDatabase