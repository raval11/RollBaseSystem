this project is a role base authontication project
------- 1 user
------- 2 admin

--------- 1 --------
----- user registration
----- user login
----- create blog
----- show blog
----- delete blog

---------2--------
--- verify user by admin
--- verify blog by admin

ravalrudresh482@gmail.com  -- admin id to registartion

* registartion
-- username, email, password (req.body)

* login
-- email,password (req.body)

* userPermission
-- token (header) _id (req.body)

* createBlog
-- title,contant (req.body)
  
* permissionBlog
-- blog_id,permission (req.body) 
-- reject permission   comments (req.body)

* deleteBlog
-- id (req.params) 

* displayblog
* profileBlog
    
