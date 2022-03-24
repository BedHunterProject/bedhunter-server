const jwtToken = require("jsonwebtoken");

const config = process.env;

const verifyJwtToken = (req, res, next) => {
  const myToken =
    req.body.myToken || req.query.myToken || req.headers["x-access-myToken"];

  if (!myToken) {
    return res.status(403).send({welcomemsg:"Validation error"});
  }
  try {
    const decodeMyToken = jwtToken.verify(myToken, config.TOKEN_KEY);
    req.user = decodeMyToken;
  } catch (err) {
    return res.status(401).send({welcomemsg:"Validation error, token is invalid"});
  }
  // return res.status(200).send({user:user});
  return next();
};

module.exports = verifyJwtToken;