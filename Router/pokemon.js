const express = require("express")
const routes = express.Router()
const {addPokemon,getAllPokemon,updatePokemon} = require("../Collections/pokemon.collection")

routes.post("/add",addPokemon)
routes.get("/getpokemon",getAllPokemon)
routes.patch("/update/:id",updatePokemon)

module.exports = routes