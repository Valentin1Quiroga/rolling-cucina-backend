const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();

const {
  getUsers,
  getAuth,
  addUser,
  login,
  deleteUser,
} = require("../controllers/usersControllers");
const auth = require("../middlewares/auth");
const validateFields = require("../middlewares/validateFields");
const { checkIfUserExists } = require("../utils/customValidations");

router.get("/", getUsers);
router.get("/auth",auth, getAuth);
router.post(
  "/",
  [
    check(
      "name",
      "El nombre ingresado debe contener entre 2 y 50 caracteres"
    )
      .isString()
      .isLength({ min: 2, max: 50 }),
    check("email","El email debe tener entre 5 y 40 caracteres").isEmail().isLength({ min: 5, max: 40 }),
    check("phone","El numero ingresado no es posible de guardar").isFloat(),
    check("admin").isBoolean(),
    check("password","La contraseña ingresada no cumple con los requisitos: Entre 6 y 20 caracteres, con al menos una mayuscula, una minuscula y un numero")
      .not()
      .isEmpty()
      .isLength({ min: 6, max: 20})
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/),
    validateFields,
  ],
  addUser
);
router.post(
  "/login",
  [
    check("email","Ha ocurrido un problema con el email").isEmail().isLength({ min: 5, max: 50 }),
    check("password","Ha ocurrido un problema con la contraseña").not().isEmpty(),
    validateFields,
  ],
  login
);
router.delete(
  "/",
  [
   auth,
    check("id").not().isEmpty().isMongoId().custom(checkIfUserExists),
    validateFields,
  ],
  deleteUser
);

module.exports = router;
