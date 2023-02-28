const Menu = require("../models/Menu");
const CustomError = require("../utils/CustomErrors");

//Controlador GET a traves del cual se obtiene el array de menus disponibles en la carta del retaurante
const getMenu = async (req, res) => {
  try {
    const menus = await Menu.find();
    res.status(200).json({ menus });
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ message: "Ocurrio un error. Motivo: " + error.message });
  }
};
// const getSearchedMenu = async (req,res)=>{
//     try {
//         const {name} = req.params;
//     const menu = await Menu.findOne({name:name});
//     if(!menu) throw new CustomError("Ese menu no se encuentra en la carta", 401);
//     res.status(200).json({ menu });
//     } catch (error) {
//         res
//         .status(error.code || 500)
//         .json({ message: error.message || "Ha ocurrido un problema inesperado. Por favor intente de nuevo mas tarde." });      
//     }
// }
//Controlador POST con el cual se agrega un nuevo menu a la carta
const addMenu = async (req, res) => {
  try {
    const newMenu = new Menu(req.body);
    const menu = await newMenu.save();
    if (!menu) throw new CustomError("Fallo el guardado");
    res.status(201).json({ message: "El menu se agregó correctamente", menu });
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ message: "Ocurrio un error. Motivo: " + error.message });
  }
};

//Controlador del pedido DELETE, a traves del cual se elimina un menu de la carta. Recibe el id del menu que sera eliminado
const deleteMenu = async (req, res) => {
  try {
    const { id } = req.body;
    const menuRemoved = await Menu.findByIdAndDelete(id);
    if (!menuRemoved)
      throw new CustomError(
        "El menu no está actualmente en nuestra carta",
        404
      );
    res.status(200).json({ message: "Menu borrado" });
  } catch (error) {
    res
      .status(error.code || 500)
      .json({
        message:
          error.message ||
          "Ha ocurrido un problema inesperado. Por favor intente de nuevo mas tarde.",
      });
  }
};

//Controlador del pedido PUT, a traves del cual podremos editar un menu que se encuentra disponible en la carta.
const editMenu = async (req, res) => {
  try {
    const { id, fields } = req.body;
    const updatedMenu = await User.findByIdAndUpdate(id, fields, { new: true });
    res
      .status(200)
      .json({ message: "El menu ha sido editado con éxito", updatedMenu });
  } catch (error) {
    res.status(error.code || 500).json({
      message:
        error.message ||
        "Ha ocurrido un problema inesperado. Por favor intente de nuevo mas tarde.",
    });
  }
};

module.exports = {
  getMenu,
  addMenu,
  deleteMenu,
  editMenu,
};
