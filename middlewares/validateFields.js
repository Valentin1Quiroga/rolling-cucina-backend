const { validationResult } = require("express-validator");

const validateFields = (req, res, next) => {
  const { errors } = validationResult(req);
  if (errors.length > 0) {
    res.status(400).json({ message: "Algo esta mal!", errors });
  } else {
    next();
  }
};

module.exports = validateFields;
