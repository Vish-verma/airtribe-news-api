const fileWriter = require("../helper/file-helper");

const validator = require("../helper/validator");
const usersData = require("../data/users.json");
const {getCache, setCache} = require('../cache');

const getUserPreference = async (req, res) => {
  try {
    let { preferences,id } = req.user;
    let cachedData = await getCache(`USER_${preferences}_${id}`);
    if(cachedData){
      res.status(200).send({ preferences: cachedData.preferences });
    }
    if (dbUser) {
      setCache(`USER_${preferences}_${id}`,{ preferences: dbUser.preferences });
      res.status(200).send({ preferences: dbUser.preferences });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Something went wrong !" });
  }
};
const addUserPreference = (req, res) => {
  try {
    let { users } = usersData;
    let dbUser = req.user;
    let { preferences } = req.body;
    if (dbUser) {
      dbUser.preferences = preferences;
      let validatorObj = validator.validateUserObj(dbUser);
      if (validatorObj.status) {
        let result = fileWriter(dbUser, users);
        if (result.status) {
          res.status(200).send(validatorObj);
        } else {
          res.status(500).send(result);
        }
      } else {
        res.status(400).send(validatorObj);
      }
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  } catch (error) {
    console.log("err", error);
    res.status(500).send({ message: "Something went wrong !" });
  }
};
module.exports = {
  getUserPreference,
  addUserPreference,
};
