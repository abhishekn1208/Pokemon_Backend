const express = require("express")
const routes = express.Router()
const {addPokemon,getAllPokemon,updatePokemon} = require("../Collections/pokemon.collection")
const auth = require("../middleware/auth")
const CanAccess = require("../middleware/CanAccess")

routes.post("/add",auth,CanAccess("admin"),addPokemon)
routes.get("/getpokemon",auth,getAllPokemon)
routes.patch("/update/:id",auth,CanAccess("admin"),updatePokemon)

module.exports = routes