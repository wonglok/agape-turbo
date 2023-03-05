// import arc from "@architect/functions";
import { getOOBEHTML } from "./getOOBEHTML.mjs";
import { getSuccessfulHTML } from "./getSuccessfulHTML.mjs";
import { checkSystemSetup } from "@architect/shared/Auth.mjs";
export async function handler(req) {
  //
  let allSetupDone = checkSystemSetup();

  if (allSetupDone) {
    return {
      cors: true,
      statusCode: 200,
      headers: {
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Credentials": true,

        "cache-control":
          "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
        "content-type": "text/html; charset=utf8",
      },
      body: await getSuccessfulHTML(),
    };
  } else {
    return {
      cors: true,
      statusCode: 200,
      headers: {
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Credentials": true,
        "cache-control":
          "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
        "content-type": "text/html; charset=utf8",
      },

      body: await getOOBEHTML(),
    };
  }
}
