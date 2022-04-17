const getSigningKey = (keys) => {
  if (!keys || !keys.length) return console.log("No keys found in JWKS");

  const signingKeys = keys.filter(
    (key) =>
      key.use === "sig" &&
      key.kty === "RSA" &&
      key.kid &&
      ((key.x5c && key.x5c.length) || (key.n && key.e))
  );

  // TO-DO: Add mapping to only return required key data
  // const mappedSigningKeys = signingKeys.map((key) => {
  //   return {
  //     kid: key.kid,
  //     nbf: key.nbf,
  //     publicKey: certToPEM(key.x5c[0] || key.n),
  //   };
  // });
  // console.log(mappedSigningKeys);

  if (!signingKeys.length) return console.log("No signing keys found in JWKS");

  return signingKeys;
};
export default getSigningKey;
