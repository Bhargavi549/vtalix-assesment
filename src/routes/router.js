const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");

router.post("create-employee",userController.register);
router.post("/login", userController.login);
router.get("/get-employees",userController.getEmployee);
router.delete("/delete", userController.deleteEmployee);
router.get("/all-employees", userController.getAllEmployee);

module.exports = router;