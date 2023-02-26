const { Router } = require("express");
const { check } = require("express-validator");

const validateFields = require("../middlewares/validateFields");


const {
  getPedido,
  addPedido,
  deletePedido,
  editPedido,
} = require("../controllers/pedidosControllers");
const auth = require("../middlewares/auth");
const router = Router();

router.get("/", getPedido);
router.post("/",[
    auth,
    check("user").not().isEmpty().isMongoId(),
    check("menu").isArray().notEmpty(),
    check("total")
    .isFloat({ min: 0 })
    .withMessage("El total debe ser mayor a 0"),
    validateFields,
],addPedido);
router.delete("/",deletePedido);
router.put(
  "/",
  [
    auth,
    check("id").not().isEmpty().isMongoId(),
    validateFields,
  ],
  editPedido
);



module.exports = router;