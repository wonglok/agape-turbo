let jose = require("jose");

async function Run() {
  const { publicKey, privateKey } = await jose.generateKeyPair("ES256");
  const publicJwk = await jose.exportJWK(publicKey);
  const privateJwk = await jose.exportJWK(privateKey);

  const JWT_B64_PUBLIC = Buffer.from(
    JSON.stringify(publicJwk),
    "utf8"
  ).toString("base64");

  const JWT_B64_PRIVATE = Buffer.from(
    JSON.stringify(privateJwk),
    "utf8"
  ).toString("base64");

  console.log("");
  console.log("JWT_B64_PUBLIC");
  console.log(JWT_B64_PUBLIC);
  console.log("");
  console.log("JWT_B64_PRIVATE");
  console.log(JWT_B64_PRIVATE);
}

Run();

//
