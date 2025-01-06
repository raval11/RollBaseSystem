const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const connectDatabase = require("./connection/connection")
const cookie_parser = require("cookie-parser")
const Employess_Route = require("./routes/employessRoute")
const blog_Route = require("./routes/blogeRoute")

const app = express()
dotenv.config()
connectDatabase()
app.use(cors())
app.use(cookie_parser())


app.use("/api",Employess_Route)
app.use("/api",blog_Route)


const port = process.env.PORT || 4000

app.listen(port,()=>{
    console.log("Server listening on port = " + port)
})

