import {
  generateSecret,
  exportJWK,
  importJWK,
  SignJWT,
  jwtVerify,
  generateKeyPair as joseGenerateKeyPair,
} from "jose";
import { v4 } from "uuid";
import { getAddress, verifyMessage as ethersVerifyMessage } from "ethers";
import { SystemAdmins } from "./SystemAdmins-config.mjs";

export function checkIsSystemAdmin({ userID }) {
  return SystemAdmins.some((r) => r.userID === userID);
}

export function checkSystemSetup() {
  return (
    !!process.env.ARC_APP_SECRET &&
    !!process.env.JWT_B64_PRIVATE &&
    !!process.env.JWT_B64_PUBLIC
  );
}

export function checkIsAddressCorrect(address) {
  try {
    return Boolean(getAddress(address));
  } catch (e) {
    console.error(e);
    return false;
  }
}

export function verifyMessage({ rawMessage, signature }) {
  let address = ethersVerifyMessage(rawMessage, signature);

  if (checkIsAddressCorrect(address)) {
    return true;
  }

  return false;
}

// let jose = require("jose");
// let bcrypt = require("bcrypt");
// let loginCode = () => {
//   var getRAND = () => Math.random().toString(36).slice(-8);
//   return `ONE_TIME_LOGIN_CODE_${getRAND()}_${getRAND()}`;
// };

// let yo = 123;

export const getID = () => "_" + v4() + "";

export const generateKeyPair = async () => {
  const appSecret = await generateSecret("HS256");
  const appSecretJwk = await exportJWK(appSecret);
  const ARC_APP_SECRET = Buffer.from(
    JSON.stringify(appSecretJwk),
    "utf8"
  ).toString("base64");

  const { publicKey, privateKey } = await joseGenerateKeyPair("ES256");

  const publicJwk = await exportJWK(publicKey);
  const privateJwk = await exportJWK(privateKey);

  const JWT_B64_PUBLIC = Buffer.from(
    JSON.stringify(publicJwk),
    "utf8"
  ).toString("base64");

  const JWT_B64_PRIVATE = Buffer.from(
    JSON.stringify(privateJwk),
    "utf8"
  ).toString("base64");

  return {
    ARC_APP_SECRET,
    JWT_B64_PRIVATE,
    JWT_B64_PUBLIC,
  };
};

//
export const signUserJWT = async ({ userID }) => {
  //

  let privateKeyObj = await importJWK(
    JSON.parse(Buffer.from(process.env.JWT_B64_PRIVATE, "base64")),
    "ES256"
  );

  //
  const jwt = await new SignJWT({
    userID: `${userID}`,
  })
    .setProtectedHeader({ alg: "ES256" })
    .setIssuer("urn:metaverse:issuer")
    .setAudience("urn:metaverse:audience")
    .sign(privateKeyObj);

  //
  // console.log("sign jwt", jwt);
  //

  return { jwt };
};

//
export const verifyUserJWT = async ({ jwt }) => {
  //
  let publicKeyObj = await importJWK(
    JSON.parse(Buffer.from(process.env.JWT_B64_PUBLIC, "base64")),
    "ES256"
  );

  //
  const { payload, protectedHeader } = await jwtVerify(jwt + "", publicKeyObj, {
    issuer: "urn:metaverse:issuer",
    audience: "urn:metaverse:audience",
  });

  //
  // console.log("payload", payload);
  // console.log("protectedHeader", protectedHeader);
  //

  return {
    userInfo: payload,
    protectedHeader,
  };
};

//
export const getPWHash = async ({ myPlaintextPassword, saltRounds = 20 }) => {
  return new Promise((resolve, reject) => {
    // bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
    //   if (err) {
    //     reject(err);
    //   } else {
    //     resolve(hash);
    //   }
    // });
  });
};

//
export const verifyPW = async ({
  myPlaintextPassword,
  hashFromDB = "____",
}) => {
  return new Promise((resolve, reject) => {
    // bcrypt.compare(myPlaintextPassword, hashFromDB, function (err, result) {
    //   if (err) {
    //     reject(err);
    //   } else if (result === true) {
    //     resolve(result);
    //   } else {
    //     reject({ error: "bad password." });
    //   }
    // });
  });
};

export const createEmailLoginSession = () => {
  //
};

export const verifyingLoginNumberForSession = () => {
  //
};

//

export const getAdminAddressMD5 = () => {
  return [
    //
  ];
};

// early return to show error
export async function checkAdminLogin(req) {
  // if (!req.session.accountID) {
  //   return { statusCode: 403 };
  // }

  let notSecure = false;

  if (notSecure) {
    return {
      cors: true,
      statusCode: 503,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        status: "failed",
      }),
    };
  }
}
