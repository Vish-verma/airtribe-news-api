const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fileWriter = require("../helper/file-helper");

const validator = require("../helper/validator");
//Tasks Data
const usersData = require("../data/users.json");

const registerUser = (req, res) => {
  try {
    let userDetails = req.body;
    let { users } = usersData;
    let validatorObj = validator.validateUserInfo(userDetails, users);
    if (validatorObj.status) {
      userDetails.password = bcrypt.hashSync(userDetails.password, 8);
      let result = fileWriter(userDetails, users);
      if (result.status) {
        return res.status(200).send(result);
      } else {
        return res.status(500).send(result);
      }
    } else {
      res.status(400);
      return res.send(validatorObj);
    }
  } catch (error) {
    return res.status(500).send({ message: "Something went wrong !" });
  }
};

const loginUser = (req, res) => {
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
        return  res
          .status(401)
          .send({ accessToken: null, message: "Invalid Credentials" });
      }
      let tokenExpiry = 86400;
      var token = jwt.sign(
        {
          id: dbUser.id,
        },
        process.env.AUTH_SECRET,
        {
          expiresIn: tokenExpiry,
        }
      );

      //responding to client request with user profile success message and  access token .
      return res.status(200).send({
        user: {
          id: dbUser.id,
          email: dbUser.email,
          fullName: dbUser.fullName,
        },
        message: "Login successfull",
        accessToken: token,
      });
    } else {
      return res.status(404).send({ message: "User Not Found" });
    }
  } catch (error) {

    return res.status(500).send({ message: "Something went wrong !" });
  }
};

module.exports = { registerUser, loginUser };
