const mongoose = require("mongoose")

const PokemonSchema = new mongoose.Schema({
    pokemon_id :{
        type : Number,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    types : [String],
    sprite : {
        type : String
    },
    color :{
      type : String
    },
    stats : {
        hp: {
            type: Number,
            required: true
          },
          attack: {
            type: Number,
            required: true
          },
          defense: {
            type: Number,
            required: true
          },
          speed: {
            type: Number,
            required: true
          },
          sp_Atk :{
            type: Number,
            required: true
          },
          sp_Def : {
            type: Number,
            required: true
          }
    }
})

const Pokemon = mongoose.model("Pokemon",PokemonSchema)

module.exports = Pokemon