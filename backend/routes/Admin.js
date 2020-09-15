const express = require("express");
const router = express.Router();

const adminController = require("../controllers/Admin");

router.post("/signup", adminController.signup);
router.post("/login", adminController.login);

module.exports = router;
