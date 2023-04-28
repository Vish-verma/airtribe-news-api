//required packages
const express = require("express");
const axios = require("axios");
//router initialization
const router = express.Router();

router.get("/", (req, res) => {
  try {
    let dbUser = req.user;
    axios
      .get("https://newsapi.org/v2/everything", {
        params: { q: dbUser.preferences, pageSize:20, apiKey:process.env.NEWS_API_KEY },
      })
      .then(function (response) {
        let { data } = response;
        res.status(200).send({articles: data.articles});
      })
      .catch(function (err) {
        res.status(500).send({ message: "Something went wrong !" });
      });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong !" });
  }
});

module.exports = router;
