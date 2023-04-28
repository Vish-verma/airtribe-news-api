class validator {
    static validateUserInfo(userInfo, userData) {
        if(userInfo.hasOwnProperty("fullName") &&
        userInfo.hasOwnProperty("email") &&
        userInfo.hasOwnProperty("id") &&
        userInfo.hasOwnProperty("password") &&
        userInfo.hasOwnProperty("preferences")){

            if(this.validateUniqueId(userInfo,userData)){
                return {
                    "status": true,
                    "message": "Id should be Unique"
                  };
            }
            if(this.validateUniqueEmail(userInfo,userData)){
                return {
                    "status": true,
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

    
    static validateUniqueEmail(userObj, usersDate) {
      let valueFound =usersDate.some(el => el.email === userObj.email);
      if(valueFound) return false;
      return true;
    }
    static validateUniqueId(userObj, usersDate) {
      let valueFound =usersDate.some(el => el.id === userObj.id);
      if(valueFound) return false;
      return true;
    }
  }
  
  module.exports = validator;