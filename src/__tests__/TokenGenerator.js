import { JWK, JWS } from "node-jose";

class TokenGenerator {
  #key;

  async init() {
    const keystore = JWK.createKeyStore();
    this.#key = await keystore.generate("RSA", 2048, {
      alg: "RS256",
      use: "sig",
    });
    console.log(keystore);
  }

  get jwk() {
    console.log(this.#key);
    return this.#key.toJSON();
  }

  async createSignedJWT(payload) {
    const payloadJson = JSON.stringify(payload);
    return await JWS.createSign(
      { compact: true, fields: { typ: "jwt" } },
      this.#key
    )
      .update(payloadJson)
      .final();
  }

  async createVerifyJWT(key, token) {
    return await JWS.createVerify(key).verify(token);
  }
}

export default TokenGenerator;
