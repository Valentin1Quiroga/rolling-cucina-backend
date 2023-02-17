const Menu = require("../models/Menu")
const CustomError = require("../utils/CustomErrors")

const getMenu = async (req,res) =>{
    try {
        const menus = await Menu.find();
        res.status(200).json({menus});
        
    } catch (error) {
        res.status(error.code || 500).json({message: "Ocurrio un error. Motivo: "+ error.message})
    }
}

const addMenu = async (req,res) =>{
    try {
        const newMenu = new Menu(req.body);
        const menu = await newMenu.save();
        if(!menu) throw new CustomError("Fallo el guardado")
        res.status(201).json({message:"El menu se agregó correctamente", menu})
    } catch (error) {
        res.status(error.code || 500).json({message: "Ocurrio un error. Motivo: "+ error.message})

    }
}

module.exports = {
    getMenu,
    addMenu
}