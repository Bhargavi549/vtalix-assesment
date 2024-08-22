const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/create-employee",userController.register);
router.post("/login", userController.login);
router.get("/get-employees/:id",userController.getEmployee);
router.delete("/delete/:id", userController.deleteEmployee);
router.get("/all-employees", userController.getAllEmployee);

module.exports = router;