const jwt = require("jsonwebtoken");
import getJwks from "./getJwks";
import getSigningKey from "./getSigningKeys";
import getKey from "./getKey";

const authorize = (options) => async (req, res, next) => {
  console.log("authorize");
  const token = req?.headers?.authorizationinfo;
  console.log(token);
  if (!token && token.split(".").length !== 3)
    return res.status(401).send("User is not authorised");

  console.log("token successfully received");
  try {
    const jwks = await getJwks(options.issuer);
    console.log(jwks);
    const signingKey = await getSigningKey(jwks);
    console.log(signingKey);
    //Should there be a step here to confirm that kid is the same as the kid in the token?
    const secret = await getKey(options, signingKey[0].kid);
    console.log(secret);
    var decoded = jwt.verify(token, secret, {
      algorithms: [options.algorithms],
    });
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send("User is not authorised");
  }
};

//NOTE - DECODE CODE - TEST PASSING
// const authorize = (options) => async (req, res, next) => {
//   var jwt = require("jsonwebtoken");
//   // console.log("authorize");
//   // console.log(req);
//   if (!req.headers.authorizationinfo)
//     return res.status(401).send("Unauthorized");

//   const authorizationinfo = req.headers.authorizationinfo;
//   try {
//     // console.log("authorize try");
//     // console.log(authorizationinfo);
//     var decoded = jwt.decode(authorizationinfo, { complete: true });
//     console.log(decoded.payload);
//     req.user = decoded.payload;
//     res.status(200).send(decoded.payload);
//   } catch (error) {
//     console.log("authorize catch");
//     Promise.reject("Not implemented");
//   }
// };

//NOTE - ORIGINAL CODE
// const authorize = (options) => async (req, res, next) =>
//   Promise.reject("Not implemented");

// const decoded = async (req) => {
//   // get the decoded payload ignoring signature, no secretOrPrivateKey needed
//   var decoded = jwt.decode(token);

//   // get the decoded payload and header
//   var decoded = jwt.decode(token, { complete: true });
//   console.log(decoded.header);
//   console.log(decoded.payload);
// };

export default authorize;
