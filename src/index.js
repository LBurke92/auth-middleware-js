const jwt = require("jsonwebtoken");
import getJwks from "./getJwks";
import getSigningKey from "./getSigningKeys";
import getKey from "./getKey";

const authorize = (options) => async (req, res, next) => {
  const token = req?.headers?.authorizationinfo;
  const currentTime = Math.round(Date.now() / 1000);

  if (!token || token.split(".").length != 3) {
    return res.status(401).send("User is not authorised");
  }

  try {
    const jwks = await getJwks(options.issuer);
    const signingKey = await getSigningKey(jwks);
    //Should there be a step here to confirm that kid is the same as the kid in the token?
    const secret = await getKey(options, signingKey[0].kid);
    var decoded = jwt.verify(token, secret, {
      algorithms: [options.algorithms],
    });

    if (decoded.exp < currentTime)
      return res.status(401).send("Token has expired");

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send("User is not authorised");
  }
};

export default authorize;
