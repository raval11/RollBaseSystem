const express = require('express')
const blog_Route = express.Router()
const bodyParser = require("body-parser")
const checkAuth = require('../middleware/auth')
const { createBlog, permissionBlog, deleteBlog, displayBlog, profileBlog } = require('../controller/BlogController')


blog_Route.use(express.json())
blog_Route.use(bodyParser.json())
blog_Route.use(bodyParser.urlencoded({ extended: true }))

blog_Route.post("/blog/add",checkAuth,createBlog)
blog_Route.post("/blog/permission",checkAuth,permissionBlog)
blog_Route.post("/blog/deleteblog/:id", checkAuth, deleteBlog)
blog_Route.post("/blog/allblog", checkAuth, displayBlog)
blog_Route.post("/blog/profileblog", checkAuth, profileBlog)



module.exports = blog_Route