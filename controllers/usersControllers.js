const User = require("../models/User")
const CustomError = require("../utils/CustomErrors")

const getUsers = async (req,res) =>{
    try {
        const users = await User.find();
        res.status(200).json({users});
        
    } catch (error) {
        res.status(error.code || 500).json({message: "Ocurrio un error. Motivo: "+ error.message})
    }
}

const addUser = async (req,res) =>{
    try {
        const newUser = new User(req.body);
        const user = await newUser.save();
        if(!user) throw new CustomError("falló guardado")
        res.status(201).json({message:"El usuario se creó correctamente", user})
    } catch (error) {
        res.status(error.code || 500).json({message: "Ocurrio un error. Motivo: "+ error.message})

    }
}

module.exports = {
    getUsers,
    addUser
}