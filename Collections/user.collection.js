const User = require("../model/user.model")
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
const blacklist_token = require("../blackListToken/blackListtoken");

const userSignup=async(req,res)=>{
 try {
    const {username,email,password,role} = req.body
    const user = await User.findOne({email})
    if(user) return res.status(401).json({message : "User already exists"})
    

 const hashedPassword = bcrypt.hashSync(password, saltRounds);
    const newUser = new User({username : username,email : email, password : hashedPassword,role})
    newUser.save()
    res.status(201).json(newUser)
 } catch (error) {
    res.status(501).json({message : "Internal Server Error"})
 }
}

const userSignin=async(req,res)=>{
   try {
    const {email, password} = req.body;
    const user = await User.findOne({email})
    if(!user) return res.status(401).json({message : "User not found"})
    const storedPassword = user.password
    isPasswordMatch = bcrypt.compareSync(password, storedPassword)

    if(isPasswordMatch){
        let token = jwt.sign({ userId : user._id, role : user.role }, process.env.SECRET_KEY);
        res.status(201).json({message : "Logged in successfully",token})
    }else{
        res.status(401).json({message : "Incorrect Password"})
    }
   } catch (error) {
    res.status(501).json({message : "Internal Server Error"})
   }
    
}

const userSignOut=async(req, res)=>{
    try {
      const token = req.headers.authorization.split(" ")[1]
    blacklist_token.push(token)
    res.status(201).json({messgae : "Logged Out Successfully"})
    } catch (error) {
      res.status(501).json({message : "Internal Server Error"})
    }
}

module.exports = {userSignup,userSignOut,userSignin}