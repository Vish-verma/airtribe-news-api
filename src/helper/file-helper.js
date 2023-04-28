const fs = require("fs");
const path = require("path");
let writePath = path.join(__dirname, "../data", "users.json");

let fileWriter = (userObj, userData) => {
  try {
    let tempData = [ ...userData ];
    tempData.push(userObj);
    fs.writeFileSync(writePath, JSON.stringify({ users: tempData }), {
      encoding: "utf8",
      flag: "w",
    });
    return {
      status: true,
      message: "User Registered Successfully",
    };
  } catch (error) {
    console.log("err",error);
    return {
      status: false,
      message: "something went wrong",
    };
  }
};


module.exports = fileWriter;
