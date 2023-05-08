const fileWriter = require("../helper/file-helper");

const validator = require("../helper/validator");
const usersData = require("../data/users.json");
const { getCache, setCache } = require("../cache");

const getUserPreference = async (req, res) => {
  try {
    let dbUser = req.user;
    if (dbUser) {
      let { preferences, id } = dbUser;
      let cachedData = await getCache(`USER_${preferences}_${id}`);
      if (cachedData) {
        res.status(200).send({ preferences: cachedData.preferences });
        return;
      }
      setCache(`USER_${preferences}_${id}`, { preferences: preferences });
      res.status(200).send({ preferences: preferences });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  } catch (error) {
    console.log("error", error);
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
