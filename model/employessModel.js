const mongoose = require("mongoose")


const EmployessSchema = mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true,
        select: false,
    },
    verify : {
        type : Boolean,
        required : true
    },
    role : {
        type : String,
        required : true,
        enum : ['admin','user']
    }
})

module.exports = mongoose.model("Employees",EmployessSchema)

