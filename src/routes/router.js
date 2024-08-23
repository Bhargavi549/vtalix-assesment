const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require('../middleware/authentication');

router.post("/create-employee", authMiddleware,  userController.register);
router.post("/employee-login", userController.login);
router.get("/get-employee/:id",authMiddleware, userController.getEmployee);
router.delete("/delete/:id", authMiddleware, userController.deleteEmployee);
router.get("/all-employees", authMiddleware, userController.getAllEmployee);
router.post("/update-employee/:id", authMiddleware, userController.updateEmployee)
router.post("/generate-token", userController.generateToken)

module.exports = router;