//Importing required packages
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require('dotenv').config()
const newsApi = require('./routes/news');
const authApi = require('./routes/auth');
const userApi = require('./routes/user');

const verifyToken = require('./middleware/authJWT');
const routes = express.Router();

//initializing app
const app = express();

//adding required middlewares
app.use(cors());
app.use(routes);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT;

//task manager routes


app.use('/news',verifyToken, newsApi);
app.use('/preferences',verifyToken, userApi);
app.use('/',authApi);

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