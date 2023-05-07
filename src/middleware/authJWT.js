const jwt = require("jsonwebtoken");
const usersData = require("../data/users.json");

const verifyToken = (req, res, next) => {
  try {
    if (req?.headers?.authorization?.split(" ")[0] === "JWT") {
      let userToken = req?.headers?.authorization?.split(" ")[1];
      jwt.verify(userToken, process.env.AUTH_SECRET, function (err, decode) {
        if (err) {
          req.user = undefined;
          return res.status(403).send({ message: "Invalid JWT token" });
        } else {
          let { users } = usersData;

          let dbUser = users.find((item) => item.id == decode.id);
          if (dbUser) {
            req.user = dbUser;
            next();
          } else {
            return res.status(404).send({ message: "Invalid User" });
          }
        }
      });
    } else {
      return res
        .status(403)
        .send({ message: "Authorization header not found" });
    }
  } catch (error) {
    console.log("err", error);
    res.status(500).send({ message: "Something Went Wrong!" });
  }
};
module.exports = verifyToken;
