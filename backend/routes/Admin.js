const express = require("express");
const router = express.Router();

const adminController = require("../controllers/Admin");
const userController = require("../controllers/User");

router.post("/signup", adminController.signup);
router.post("/login", adminController.login);

router.post("/createUser", userController.signupUser);
router.put("/updateUser/:userId", userController.updateUser);
router.delete("/deleteUser/:userId", userController.deleteUser);
router.get("/getAllUsers", userController.getAllUsers);
router.get("/getUser/:userId", userController.getUser);

router.param("userId", userController.userBydId);
module.exports = router;
