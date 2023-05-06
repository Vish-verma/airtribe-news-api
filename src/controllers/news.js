const axios = require("axios");

const getNews = async (req, res) => {
  try {
    let dbUser = req.user;
    let response = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        q: dbUser.preferences,
        pageSize: 20,
        apiKey: process.env.NEWS_API_KEY,
      },
    });
    if (response) {
      let { data } = response;
      res.status(200).send({ articles: data.articles });
    } else {
      res.status(500).send({ message: "Something went wrong !" });
    }
  } catch (error) {
    res.status(500).send({ message: "Something went wrong !" });
  }
};

module.exports = {
  getNews,
};
