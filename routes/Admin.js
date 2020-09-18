const express = require("express");
const router = express.Router();

const adminController = require("../controllers/Admin");
const userController = require("../controllers/User");
const taskController = require("../controllers/Task");

router.post("/signup", adminController.signup);
router.post("/login", adminController.login);

router.post("/createUser", userController.signupUser);
router.put("/updateUser/:userId", userController.updateUser);
router.delete("/deleteUser/:userId", userController.deleteUser);
router.get("/getAllUsers", userController.getAllUsers);
router.get("/getUser/:userId", userController.getUser);

router.post("/createTask", taskController.createTask);
router.put("/addUser/:taskId/:userId", taskController.addUserToTask);
router.put("/updateTask/:taskId", taskController.updateTask);
router.delete("/deleteTask/:taskId", taskController.deleteTask);
router.get("/getAllTasks", taskController.getAllTasks);
router.get("/getTask/:taskId", taskController.getTask);
router.delete("/removeUser/:taskId", taskController.removeUser);

router.param("userId", userController.userBydId);
router.param("taskId", taskController.taskById);
module.exports = router;
