const axios = require("axios");

const getJwks = async (issuer) => {
  return await axios
    .get(`${issuer}/.well-known/jwks.json`)
    .then(function (response) {
      return response.data.keys;
    })
    .catch(function (error) {
      res.status(400).send(error);
    });
};

export default getJwks;
