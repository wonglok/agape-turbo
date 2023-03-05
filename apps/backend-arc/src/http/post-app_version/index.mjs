import arc from "@architect/functions";
import * as Auth from "@architect/shared/Auth.mjs";
import ORMClass from "@architect/shared/ORMClass.mjs";
import { SystemAdmins } from "@architect/shared/SystemAdmins-config.mjs";

export const AppVersion = new ORMClass({ collection: "AppVersion" });

async function reply(req) {
  try {
    //
    let bodyData = JSON.parse(req.body);
    let jwt = bodyData.jwt;
    let action = bodyData.action;
    let payload = bodyData.payload;

    // middleware
    if (!jwt) {
      throw { msg: "No jwt given", reason: "no-jwt" };
    }

    let { userInfo } = await Auth.verifyUserJWT({ jwt: jwt });
    if (!userInfo || !userInfo?.userID) {
      throw { msg: "JWT is expired", reason: "expire-jwt" };
    }

    if (!SystemAdmins.some((e) => e.userID === userInfo?.userID)) {
      throw {
        msg: "Require System Admin Access Rights",
        reason: "no-access-right",
      };
    }

    if (action === "create") {
      let result = await AppVersion.create({
        data: {
          ...(payload || {}),

          createdAt: new Date().getTime(),
          createdBy: userInfo.userID,
          updatedBy: userInfo.userID,
          oid: Auth.getID(),
        },
      });

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
          result: result,
        }),
      };
    }

    if (action === "listAll") {
      let result = await AppVersion.listAll({});

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
          result: result?.Items || [],
        }),
      };
    }

    if (action === "remove") {
      let result = await AppVersion.remove({ oid: payload.oid });

      console.log(result);
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
          result,
        }),
      };
    }

    if (action === "get") {
      let result = await AppVersion.get({ oid: payload.oid });

      console.log(result);
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
          result,
        }),
      };
    }

    if (action === "update") {
      let result = await AppVersion.update({ data: payload });

      console.log(result);
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
          result,
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
