const { Router } = require("express");
const { check } = require("express-validator");

const validateFields = require("../middlewares/validateFields");


const {
  getMenu,
  // getSearchedMenu,
  addMenu,
  deleteMenu,
} = require("../controllers/menuControllers");
const router = Router();

router.get("/", getMenu);
// router.get("/:name?", getSearchedMenu);
router.post(
  "/",
  [
    check("name").isString().isLength({ min: 3, max: 35 }),
    check("description").isString().isLength({ min: 5, max: 120 }),
    check("category")
      .notEmpty()
      .isIn([
        "entrada",
        "pizza",
        "pasta",
        "ensalada",
        "otros",
        "bebida",
        "postre",
      ]),
    check("price")
      .isFloat({ min: 0 })
      .withMessage("El precio debe ser mayor a 0"),
      validateFields,
  ],
  addMenu
);
router.delete("/", [check("id").not().isEmpty().isMongoId(), validateFields], deleteMenu);

module.exports = router;
