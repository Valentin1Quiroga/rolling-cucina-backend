const { Router } = require("express");
const { check } = require("express-validator");

const validateFields = require("../middlewares/validateFields");


const {
  getPedido,
  addPedido,
  deletePedido,
} = require("../controllers/pedidosControllers");
const router = Router();

router.get("/", getPedido);
router.post("/",[
    check("user").not().isEmpty().isMongoId(),
    check("menu").isArray().notEmpty(),
    validateFields,
],addPedido);
router.delete("/",deletePedido)


module.exports = router;