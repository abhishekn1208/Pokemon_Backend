const Pokemon = require("../model/pokemon")

const addPokemon=async(req,res)=>{
   try {
    const {pokemon_id} = req.body
    const pokemon = await Pokemon.findOne({pokemon_id})
    if(pokemon) return res.status(401).json({message : "Already exists"})

    const newPokemon = new Pokemon({...req.body})
    newPokemon.save()
    res.status(200).json(newPokemon)
   } catch (error) {
    res.status(501).json({message : "Internal Server Error"})
   }
}

const getAllPokemon=async(req,res)=>{
  try {
    const {page, limit, name,pokemon_id,sortQuery} = req.query;

    const pageNumber = Number(page) || 1;
    const pageSize = Number(limit) || 5;
    const skip = (pageNumber-1)*pageSize
 
    let filter = {}
     let sortedData = {}
     if(sortQuery === "name"){
        sortedData.name = 1
     }
     if(sortQuery === "pokemon_id"){
      sortedData.pokemon_id = 1
     }

    if(name){
     filter.name = {$regex : name, $options :'i'}
    }
    if(pokemon_id){
     filter.pokemon_id = pokemon_id
    }
 
    const pokemon = await Pokemon.find(filter).skip(skip).limit(pageSize).sort(sortedData);
 
    const totalPokemons = await Pokemon.countDocuments(filter)
 
    const totalPages = Math.ceil(totalPokemons/pageSize)
 
    res.status(201).json({
     pokemon,
     currentPage : pageNumber,
     pageSize,
     totalPages,
     totalPokemons
    })
  } catch (error) {
    res.status(501).json({message : "Internal Server Error"})
  }

}

const updatePokemon=async(req,res)=>{
 try {
  const pokemon = await Pokemon.findById(req.params.id);
  if(!pokemon) return res.status(401).json({message : "Does not exists"})
  
  const updatedpokemon = await Pokemon.findByIdAndUpdate(req.params.id,{...req.body},{new:true})
  await updatedpokemon.save()
  res.status(201).json(updatedpokemon)
 } catch (error) {
  res.status(501).json({message : "Internal Server Error"})
 }
}

module.exports ={addPokemon,getAllPokemon,updatePokemon}