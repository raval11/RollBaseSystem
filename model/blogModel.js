const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({
    title:{
        type : String,
        required : true
    },
    contant : {
        type : String,
        required : true
    },
    status : {
        type : String,
        require : true,
        enum : ["active",'panding','reject']
    },
    userid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Employees',
        required : true
    },
    comments : {
        type : String
    }

})

module.exports = mongoose.model("Blog",BlogSchema)