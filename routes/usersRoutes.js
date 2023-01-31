const { Router } = require("express");
const { getUsers } = require("../controllers/usersControllers");
const router = Router();

router.get("/", getUsers);

module.exports =router;