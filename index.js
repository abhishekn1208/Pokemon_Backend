const express = require("express")
require('dotenv').config()
const app = express()
var cors = require('cors')
const PORT = process.env.PORT
const MongoConnect = require("./Config/db")
const PokemonRouter = require("./Router/pokemon")
const userRouter = require("./Router/user.router")
app.use(express.json())
app.use(cors())
app.use("/user",userRouter)
app.use("/pokemon",PokemonRouter)

app.get("/health",(req,res)=>{
    res.send("OK")
})

app.listen(PORT,async()=>{
    await MongoConnect()
    console.log(`App is listening on the PORT : ${PORT}`)
})