import arc from "@architect/functions";
import * as Auth from "@architect/shared/Auth.mjs";
import ORMClass from "@architect/shared/ORMClass.mjs";

export const AdminUser = new ORMClass({ collection: "AdminUser" });

async function reply(req) {
  try {
    //
    let bodyData = JSON.parse(req.body);
    let action = bodyData.action;
    let payload = bodyData.payload;

    if (action === "verifyJWT") {
      if (!payload?.jwt) {
        throw { msg: "No jwt given", reason: "no-jwt" };
      }

      let { userInfo } = await Auth.verifyUserJWT({
        jwt: payload.jwt,
      });
      if (!userInfo || !userInfo?.userID) {
        throw { msg: "JWT is expired", reason: "expire-jwt" };
      }

      return {
        cors: true,
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "cache-control":
            "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
          "content-type": "application/json; charset=utf8",
        },
        body: JSON.stringify({
          status: "ok",
          userID: userInfo?.userID,
        }),
      };
    }
    if (action === "getMetamaskJWT") {
      let isVerified = await Auth.verifyMessage({
        rawMessage: payload.rawMessage,
        signature: payload.signature,
      });

      if (!isVerified) {
        throw { msg: "Signature Didn't match", reason: "signature-not-match" };
      }

      if (!payload.userID) {
        throw { msg: "No userID given", reason: "no-user-id" };
      }

      if (payload.rawMessage.indexOf(payload.userID) === -1) {
        throw { msg: "Unverified username", reason: "not-verified-id" };
      }

      let jwt = null;

      if (payload.userID) {
        let result = await Auth.signUserJWT({
          userID: payload.userID,
        });
        jwt = result.jwt;
      }
      if (jwt === null || !jwt) {
        throw { msg: "No JWT Generated", reason: "no-jwt" };
      }

      return {
        cors: true,
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "cache-control":
            "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
          "content-type": "application/json; charset=utf8",
        },
        body: JSON.stringify({
          status: "ok",
          jwt,
        }),
      };
    }

    if (action === "getAdminJWT") {
      let isVerified = false;
      if (
        process.env.ADMIN_PW === payload.password &&
        payload.userID === "admin"
      ) {
        isVerified = true;
      }

      if (!isVerified) {
        throw { msg: "Signature Didn't match", reason: "signature-not-match" };
      }

      if (!payload.userID) {
        throw { msg: "No userID given", reason: "no-user-id" };
      }

      let jwt = null;

      if (payload.userID) {
        let result = await Auth.signUserJWT({
          userID: payload.userID,
        });
        jwt = result.jwt;
      }

      if (jwt === null || !jwt) {
        throw { msg: "No JWT Generated", reason: "no-jwt" };
      }

      return {
        cors: true,
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "cache-control":
            "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
          "content-type": "application/json; charset=utf8",
        },
        body: JSON.stringify({
          status: "ok",
          jwt,
        }),
      };
    }

    throw { msg: "no action provided", reason: "no-action-name" };
  } catch (e) {
    console.error(e?.message);
    let msg = "";
    let reason = "";

    if (e.msg) {
      msg = e.msg;
    }
    if (e.reason) {
      reason = e.reason;
    }

    return {
      cors: true,
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        status: "bad",
        msg,
        reason,
      }),
    };
  }
}

export const handler = arc.http.async(reply);
