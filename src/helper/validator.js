class validator {
    static validateUserInfo(userInfo, userData) {
        if(userInfo.hasOwnProperty("fullName") &&
        userInfo.hasOwnProperty("email") &&
        userInfo.hasOwnProperty("id") &&
        userInfo.hasOwnProperty("password") &&
        userInfo.hasOwnProperty("preferences")){

            if(this.validateUniqueId(userInfo,userData)){
                return {
                    "status": false,
                    "message": "Id should be Unique"
                  };
            }
            if(this.validateUniqueEmail(userInfo,userData)){
                return {
                    "status": false,
                    "message": "Email should be Unique"
                  };
            }
            return {
                "status": true,
                "message": "User has been Added"
              };
        }
        return {
            "status": false,
            "message": "User Info is malformed please provide all the properties"
          }
      }

    static validateUserObj(userInfo){
        if(userInfo.hasOwnProperty("fullName") &&
        userInfo.hasOwnProperty("email") &&
        userInfo.hasOwnProperty("id") &&
        userInfo.hasOwnProperty("password") &&
        userInfo.hasOwnProperty("preferences")){
            return {
                "status": true,
                "message": "User has been updated"
              };
        }
        return {
            "status": false,
            "message": "User Info is malformed please provide all the properties"
          }
    }

    
    static validateUniqueEmail(userObj, usersData) {
      let valueFound =usersData.some(el => el.email === userObj.email);
      if(valueFound) return true;
      return false;
    }
    static validateUniqueId(userObj, usersData) {
      let valueFound =usersData.some(el => el.id === userObj.id);
      if(valueFound) return true;
      return false;
    }
  }
  
  module.exports = validator;