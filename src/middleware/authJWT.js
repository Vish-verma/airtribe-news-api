const jwt = require('jsonwebtoken');
const usersData = require("../data/users.json");

const verifyToken = (req, res, next) => {
    try {
        if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
            jwt.verify(req.headers.authorization.split(' ')[1], process.env.AUTH_SECRET, function (err, decode) {
              if (err)  {
                req.user = undefined;
                next();
              }
              let {users} = usersData;
        
              let dbUser = users.find(item => item.id == decode.id);
              if(dbUser){
                req.user = dbUser;
                next();
              }else{
                res.status(404).send({message:"Invalid User"});
              }
            });
          } else {
            res.status(400).send({message:"Authorization header not found"});
          }
    } catch (error) {
        console.log("err",error);
        res.status(500).send({message:"Something Went Wrong!"});
    }
  
};
module.exports = verifyToken;