const express = require("express")
const routes = express.Router()
const {userSignOut,userSignup,userSignin} = require("../Collections/user.collection")

routes.post("/signup",userSignup)
routes.post("/sigin", userSignin)
routes.post("/signout",userSignOut)

module.exports = routes