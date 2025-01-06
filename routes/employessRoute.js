const express = require('express')
const Employess_Route = express.Router()
const bodyParser = require("body-parser")
const { Registration, Login, userPermission } = require('../controller/employessController')
const checkAuth = require('../middleware/auth')


Employess_Route.use(express.json())
Employess_Route.use(bodyParser.json())
Employess_Route.use(bodyParser.urlencoded({ extended: true }))

Employess_Route.post("/employess/regisration",Registration)
Employess_Route.post("/employess/login",Login)
Employess_Route.post("/employess/permission", checkAuth, userPermission)



module.exports = Employess_Route