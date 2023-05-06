//required packages
const express = require("express");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const fileWriter  = require("../helper/file-helper");

const validator = require("../helper/validator");
//Tasks Data
const usersData = require("../data/users.json");

//router initialization
const router = express.Router();

//API to register

router.post("/register", (req, res) => {
  try {
    let userDetails = req.body;
    let { users } = usersData;
    let validatorObj = validator.validateUserInfo(userDetails, users);
    console.log("validatorObj",validatorObj, users, userDetails);
    if (validatorObj.status) {
      userDetails.password = bcrypt.hashSync(userDetails.password, 8);
      let result = fileWriter(userDetails, users);
      if (result.status) {
        res.status(200).send(result);
      } else {
        res.status(500).send(result);
      }
    } else {
      res.status(400);
      res.send(validatorObj);
    }
  } catch (error) {
    res.status(500).send({ message: "Something went wrong !" });
  }
});

//API to Login
router.post("/login", (req, res) => {
  try {
    let currUser = req.body;
    let { users } = usersData;

    let dbUser = users.find((item) => item.email == currUser.email);
    if (dbUser) {
      let passwordIsValid = bcrypt.compareSync(
        currUser.password,
        dbUser.password
      );
      if (!passwordIsValid) {
        res
          .status(401)
          .send({ accessToken: null, message: "Invalid Credentials" });
      }
      let  tokenExpiry = 86400
      var token = jwt.sign(
        {
          id: dbUser.id,
        },
        process.env.AUTH_SECRET,
        {
          expiresIn:tokenExpiry,
        }
      );

      //responding to client request with user profile success message and  access token .
      res.status(200).send({
        user: {
          id: dbUser.id,
          email: dbUser.email,
          fullName: dbUser.fullName,
        },
        message: "Login successfull",
        accessToken: token,
      });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  } catch (error) {
    console.log("error",error);

    res.status(500).send({ message: "Something went wrong !" });
  }
});

module.exports = router;
