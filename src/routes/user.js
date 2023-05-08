//required packages
const express = require("express");

//router initialization
const router = express.Router();
const {getUserPreference, addUserPreference} = require("../controllers/user");

router.get("/", getUserPreference);

router.post("/", addUserPreference);

module.exports = router;
