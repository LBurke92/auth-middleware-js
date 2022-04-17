const jwksClient = require("jwks-rsa");

const getKey = async (options, kid) => {
  const client = jwksClient({
    jwksUri: `${options.issuer}/.well-known/jwks.json`,
  });
  // console.log(client);
  const key = await client.getSigningKey(kid);
  // console.log(key);
  const signingKey = key.getPublicKey();
  // console.log(signingKey);
  return signingKey;
};

export default getKey;
