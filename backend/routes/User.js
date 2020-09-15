const express = require("express");
const router = express.Router();

const userController = require("../controllers/User");

router.post("/signup", adminController.signup);
router.post("/login", adminController.login);

module.exports = router;
