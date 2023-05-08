//required packages
const express = require("express");
//router initialization
const router = express.Router();

const { registerUser, loginUser } = require("../controllers/auth");

//API to register

router.post("/register", registerUser);

//API to Login
router.post("/login", loginUser);

module.exports = router;
