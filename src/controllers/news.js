const axios = require("axios");
const { getCache, setCache } = require("../cache");

const getNews = async (req, res) => {
  try {
    const { preferences } = req.user;

    let cacheData = await getCache(`NEWS_${preferences}`);
    if (cacheData) {
      res
        .status(200)
        .send({ articles: cacheData.articles, isCachedData: true });
      return;
    }
    let response = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        q: preferences,
        pageSize: 20,
        apiKey: process.env.NEWS_API_KEY,
      },
    });
    if (response) {
      let { data } = response;
      setCache(`NEWS_${preferences}`, { articles: data.articles });
      return res
        .status(200)
        .send({ articles: data.articles, isCachedData: false });
    } else {
      return res.status(500).send({ message: "Something went wrong !" });
    }
  } catch (error) {
    return res.status(500).send({ message: "Something went wrong !" });
  }
};

module.exports = {
  getNews,
};
