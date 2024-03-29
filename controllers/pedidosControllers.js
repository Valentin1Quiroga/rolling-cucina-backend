const Pedido = require("../models/Pedido");
const CustomError = require("../utils/CustomErrors");

//Controlador GET a traves del cual se obtiene el array de pedidos totales en el restaurante (pendientes y listos)
const getPedido = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const pedido = await Pedido.findById(id);
      if (!pedido) throw new CustomError("Pedido no encontrado", 404);
      res.status(200).json({ pedido });
    } else {
      const pedidos = await Pedido.find().populate("user", "name -_id");
      res.status(200).json({ pedidos });
    }
  } catch (error) {
    res.status(error.code || 500).json({
      message:
        error.message ||
        "Ha ocurrido un problema inesperado. Por favor intente de nuevo mas tarde.",
    });
  }
};
const getUserPedido = async (req, res) => {
  try {
    const id = req.id;
    const pedidos = await Pedido.find({ user: id }).populate("user");
    if (!pedidos) throw new CustomError("Usuario no realizo pedidos", 404);
    res.status(200).json({ pedidos });
  } catch (error) {
    res.status(error.code || 500).json({
      message:
        error.message ||
        "Ha ocurrido un problema inesperado. Por favor intente de nuevo mas tarde.",
    });
  }
};

//Controlador POST con el cual se agrega un nuevo pedido a la zona de preparacion
const addPedido = async (req, res) => {
  try {
    const newPedido = new Pedido(req.body);
    const pedido = await newPedido.save();
    if (!pedido) throw new CustomError("Fallo el guardado");
    res.status(201).json({
      message:
        "El pedido se realizó correctamente y está pendiente de realizarse. Pronto comenzaran a prepararlo. Muchas gracias.",
      pedido,
    });
  } catch (error) {
    res.status(error.code || 500).json({
      message:
        error.message ||
        "Ha ocurrido un problema inesperado. Por favor intente de nuevo mas tarde.",
    });
  }
};

//Controlador del pedido DELETE, a traves del cual se elimina un Pedido de la base de datos. Recibe el id del menu que sera eliminado
const deletePedido = async (req, res) => {
  try {
    const { id } = req.body;
    const pedidoRemoved = await Pedido.findByIdAndDelete(id);
    if (!pedidoRemoved)
      throw new CustomError(
        "El pedido no se encuentra en nuestra base de datos.",
        404
      );
    res.status(200).json({ message: "Pedido borrado" });
  } catch (error) {
    res.status(error.code || 500).json({
      message:
        error.message ||
        "Ha ocurrido un problema inesperado. Por favor intente de nuevo mas tarde.",
    });
  }
};

const editPedido = async (req, res) => {
  try {
    const { id, fields } = req.body;
    const updatedPedido = await Pedido.findByIdAndUpdate(id, fields, {
      new: true,
    });
    res
      .status(200)
      .json({ message: "El usuario ha sido editado con éxito", updatedPedido });
  } catch (error) {
    res.status(error.code || 500).json({
      message:
        error.message ||
        "Ha ocurrido un problema inesperado. Por favor intente de nuevo mas tarde.",
    });
  }
};
module.exports = {
  getPedido,
  getUserPedido,
  addPedido,
  deletePedido,
  editPedido,
};
