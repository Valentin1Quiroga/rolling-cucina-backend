const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const CustomError = require("../utils/CustomErrors");

const getUsers = async (req, res) => {
  try {
    let users;
    let counts;
    [users, counts] = await Promise.all([User.find(), User.countDocuments()]);

    res.status(200).json({ users, counts });
  } catch (error) {
    res.status(error.code || 500).json({
      message:
        error.message ||
        "Ha ocurrido un problema inesperado. Por favor intente de nuevo mas tarde.",
    });
  }
};

const getAuth = async (req, res) => {
  try {
    const id = req.id;
    const user = await User.findById(id);
    if (!user) throw new CustomError("Fallo en la autenticación", 401);
    res.status(200).json({ user });
  } catch (error) {
    res.status(error.code || 500).json({
      message:
        error.message ||
        "Ha ocurrido un problema inesperado. Por favor intente de nuevo mas tarde.",
    });
  }
};

const addUser = async (req, res) => {
  try {
    const { name, phone, email, password, admin } = req.body;
    const salt = await bcrypt.genSalt(10);
    const passwordEncrypted = await bcrypt.hash(password, salt);
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser)
      throw new CustomError("Ya existe un usuario con ese Correo", 401);
    const newUser = new User({
      name,
      phone,
      email,
      password: passwordEncrypted,
      admin,
    });
    const userSaved = await newUser.save();
    res
      .status(201)
      .json({ message: "El usuario se creó correctamente", user: userSaved });
  } catch (error) {
    res.status(error.code || 500).json({
      message:
        error.message ||
        "Ha ocurrido un problema inesperado. Por favor intente de nuevo mas tarde.",
    });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      throw new CustomError("Los campos son obligatorios", 400);
    const user = await User.findOne({ email });
    if (!user) throw new CustomError("Email Incorrecto", 404);
    const passOk = await bcrypt.compare(password, user.password);
    if (!passOk) throw new CustomError("Contraseña incorrecta", 400);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "2h",
    });
    res
      .status(200)
      .json({ message: "Ingreso correcto", ok: true, user, token });
  } catch (error) {
    res.status(error.code || 500).json({
      message:
        error.message ||
        "Ha ocurrido un problema inesperado. Por favor intente de nuevo mas tarde.",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    const userRemoved = await User.findByIdAndDelete(id);
    if (!userRemoved) throw new CustomError("Usuario no encontrado", 404);
    res.status(200).json({ message: "El usuario ha sido eliminado" });
  } catch (error) {
    res.status(error.code || 500).json({
      message:
        error.message ||
        "Ha ocurrido un problema inesperado. Por favor intente de nuevo mas tarde.",
    });
  }
};

const editUser = async (req, res) => {
  try {
    const { id, fields } = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, fields, { new: true });
    res
      .status(200)
      .json({ message: "El usuario ha sido editado con éxito", updatedUser });
  } catch (error) {
    res.status(error.code || 500).json({
      message:
        error.message ||
        "Ha ocurrido un problema inesperado. Por favor intente de nuevo mas tarde.",
    });
  }
};

module.exports = {
  getUsers,
  getAuth,
  addUser,
  login,
  deleteUser,
  editUser,
};
