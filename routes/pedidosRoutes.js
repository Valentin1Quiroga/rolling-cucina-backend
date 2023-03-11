const { Router } = require("express");
const { check } = require("express-validator");

const validateFields = require("../middlewares/validateFields");

const {
  getPedido,
  addPedido,
  deletePedido,
  editPedido,
  getUserPedido,
} = require("../controllers/pedidosControllers");
const auth = require("../middlewares/auth");
const verifyRole = require("../middlewares/verifyRole");
const router = Router();

// router.get("/userPedido", getUserPedido);
router.get("/:id?", getPedido);
router.post(
  "/",
  [
    auth,
    check("user").not().isEmpty().isMongoId(),
    check("menu").isArray().notEmpty(),
    check("total")
      .isFloat({ min: 0 })
      .withMessage("El total debe ser mayor a 0"),
    validateFields,
  ],
  addPedido
);
router.delete(
  "/",
  [auth, verifyRole, check("id").not().isEmpty().isMongoId(), validateFields],
  deletePedido
);
router.put(
  "/",
  [auth, check("id").not().isEmpty().isMongoId(), validateFields],
  editPedido
);

module.exports = router;
