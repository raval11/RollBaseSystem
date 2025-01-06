const BlogModel = require("../model/blogModel");

const createBlog = async (req, res) => {
    try {
        const {title, contant} = req.body;
        const user = req.user;

        if (user[0].verify === true) {
            const blog = new BlogModel({
                title: title,
                contant: contant,
                status: user[0].role === "admin" ? "active" : "panding",
                userid: user[0]._id,
            });
            const saBlog = await blog.save();
            res.status(201).json({message: "Blog created successfully", data: saBlog});
        } else {
            return res.status(400).json({message: "You are not verified user"});
        }
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
};


const permissionBlog = async(req,res) =>{
                try{
                    const admin = req.user
                    const blog_id = req.body.blog_id;
                    const permission = req.body.permission
                    const blog = await BlogModel.findOne({_id: blog_id})
                    if(admin[0].role === 'admin'){
                        if(blog){
                            if(blog.status === 'pending' && permission === 'active'){
                                await BlogModel.updateOne({_id: blog_id},{$set:{status : "active"}})
                                res.status(200).json({success: true, message: "blog status active successfully"})
                            }else if(blog.status === 'active' && permission === "reject"){
                                const comments = req.body.comments
                                await BlogModel.updateOne({_id: blog_id},{$set:{status : "reject", comments : comments}})
                                res.status(200).json({success: true, message: "blog status reject successfully"})
                            }else{
                                await BlogModel.updateOne({_id: blog_id},{$set:{status : "active"}})
                                res.status(200).json({success: true, message: "blog status active successfully"})
                            }

                        }else{
                            res.status(404).json({success: false, message: "blog not found"})
                        }
                    }else{
                        res.status(404).json({success: false, message:"not authorize"})
                    }
                }catch(error){
                    res.status(500).json({success: false, message: error.message});
                }
}

const deleteBlog = async(req,res) =>{
    try{
        const id = req.params.id
        const admin = req.user
        const blog = await BlogModel.findOne({_id: id})
        if(admin[0].role === 'admin'){
            if(blog){
                await BlogModel.deleteOne({_id: id})
                res.status(200).json({success: true, message: "blog deleted successfully"})
            }else{
                res.status(404).json({success: false, message: "blog not found"})
            }
        }else{
            if(blog.userid.equals(admin[0]._id)){
                await BlogModel.deleteOne({_id: id})
                res.status(200).json({success: true, message: "blog deleted successfully"})
            }else{
                res.status(404).json({success: false, message: "not authorize"})
            }
        }

    }catch(error){
        res.status(500).json({success: false, message: error.message});

    }
} 

const  displayBlog = async(req,res) =>{
    try{ 
            const blog = await BlogModel.find()
            res.status(200).json({success: true, data : blog})
        
    }catch(error){
        res.status(500).json({success: false, message: error.message});

    }
}

const profileBlog = async(req,res) =>{
    try{
        const admin = req.user
        const blog = await BlogModel.find({userid : admin[0]._id})
        res.status(200).json({success: true, data : blog})

    }catch(error){
        res.status(500).json({success: false, message: error.message});
    }
}

module.exports = {
    createBlog,
    permissionBlog,
    deleteBlog,
    displayBlog,
    profileBlog,
};
