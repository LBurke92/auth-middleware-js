const getSigningKey = (keys) => {
  if (!keys || !keys.length) return console.log("No keys found in JWKS");

  const signingKeys = keys.filter(
    (key) =>
      key.use === "sig" &&
      key.kty === "RSA" &&
      key.kid &&
      ((key.x5c && key.x5c.length) || (key.n && key.e))
  );

  if (!signingKeys.length) return console.log("No signing keys found in JWKS");

  return signingKeys;
};
export default getSigningKey;
