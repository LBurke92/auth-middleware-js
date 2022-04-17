const jwksClient = require("jwks-rsa");

const getKey = async (options, kid) => {
  const client = jwksClient({
    jwksUri: `${options.issuer}/.well-known/jwks.json`,
  });
  const key = await client.getSigningKey(kid);
  const signingKey = key.getPublicKey();

  return signingKey;
};

export default getKey;
