//Importing required packages
const express = require("express");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 15 minutes
  max: 50, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later",
});
const newsApi = require("./routes/news");
const authApi = require("./routes/auth");
const userApi = require("./routes/user");

const verifyToken = require("./middleware/authJWT");
const routes = express.Router();

//initializing app
const app = express();

//adding required middlewares
app.use(cors());
app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
    ].join(" ");
  })
);
app.use(routes);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const PORT = process.env.PORT || 3000;

//task manager routes
app.use("/", limiter);
app.use("/news", verifyToken, newsApi);
app.use("/preferences", verifyToken, userApi);
app.use("/auth", authApi);

//health check
routes.get("/", (req, res) => {
  res.status(200).send("Welcome to the airtribe News app");
});

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});

module.exports = app;
