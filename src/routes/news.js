//required packages
const express = require("express");
//router initialization
const router = express.Router();
const {getNews} = require('../controllers/news');

router.get("/", getNews);

module.exports = router;
