import * as Auth from "@architect/shared/Auth.mjs";
// import arc from "@architect/functions";

let style = ` <style>
.button-85 {
  padding: 0.6em 2em;
  border: none;
  outline: none;
  color: rgb(255, 255, 255);
  background: #111;
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: 10px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-85:before {
  content: "";
  background: linear-gradient(
    45deg,
    #ff0000,
    #ff7300,
    #fffb00,
    #48ff00,
    #00ffd5,
    #002bff,
    #7a00ff,
    #ff00c8,
    #ff0000
  );
  position: absolute;
  top: -2px;
  left: -2px;
  background-size: 400%;
  z-index: -1;
  filter: blur(5px);
  -webkit-filter: blur(5px);
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  animation: glowing-button-85 20s linear infinite;
  transition: opacity 0.3s ease-in-out;
  border-radius: 10px;
}

@keyframes glowing-button-85 {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
}

.button-85:after {
  z-index: -1;
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: #222;
  left: 0;
  top: 0;
  border-radius: 10px;
}

  </style>`;

export async function handler(req) {
  let resources = {
    // restore: await Auth.verifyUserJWT({ jwt }),

    testing: await Auth.generateKeyPair(),
    staging: await Auth.generateKeyPair(),
    production: await Auth.generateKeyPair(),
  };

  let data = /* html */ `

  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Onetime Setup Guide</title>
    ${style}
    <style>
       * { margin: 0; padding: 0; box-sizing: border-box; } body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; }
    </style>
    <script>

      async function myFunction(domID, label, el) {
        console.log(el)
        // Get the text field
        var copyText = document.getElementById(domID);

         // Select the text field
        copyText.select();
        copyText.setSelectionRange(0, 99999); // For mobile devices

        // Copy the text inside the text field
        await navigator.clipboard.writeText(copyText.value);

        // Alert the copied text
        alert("Copied");
      }

    </script>
  </head>
    <body class="" style="padding: 20px">

    <h1>Setup Environment Variables in Terminal</h1>
    <h2>Please Backup to a safe place.</h2>
    <h2> <button  class="button-85" role="button" onclick="myFunction('public-prod', 'JWT_B64_PUBLIC', this)">Copy</button></h2>
    <textarea id="public-prod" style="width: 500px; height: 500px; padding: 5px">

    arc env -e testing --add ARC_APP_SECRET ${resources.testing.ARC_APP_SECRET}

    arc env -e testing --add JWT_B64_PUBLIC ${resources.testing.JWT_B64_PUBLIC}

    arc env -e testing --add JWT_B64_PRIVATE ${resources.testing.JWT_B64_PRIVATE}

    arc env -e staging --add ARC_APP_SECRET ${resources.staging.ARC_APP_SECRET}

    arc env -e staging --add JWT_B64_PUBLIC ${resources.staging.JWT_B64_PUBLIC}

    arc env -e staging --add JWT_B64_PRIVATE ${resources.staging.JWT_B64_PRIVATE}

    arc env -e production --add ARC_APP_SECRET ${resources.production.ARC_APP_SECRET}

    arc env -e production --add JWT_B64_PUBLIC ${resources.production.JWT_B64_PUBLIC}

    arc env -e production --add JWT_B64_PRIVATE ${resources.production.JWT_B64_PRIVATE}
    </textarea>

    </body>
  </html>

  `;

  let buff = Buffer.from(data, "utf-8");
  let base64data =
    `data:text/html;charset=utf-8;base64,` + buff.toString("base64");

  // console.log("running");
  return {
    cors: true,
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      "cache-control":
        "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
      "content-type": "text/html; charset=utf8",
    },
    body: /* html */ `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Welcome</title>
      ${style}
      <style>
         * { margin: 0; padding: 0; box-sizing: border-box; } body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; }
      </style>
    </head>
      <body class="" style="padding: 20px">
        <h1 style="margin-bottom: 15px;">Welcome!</h1>

        <a href="${base64data}" target="_blank" download="pass-key-information.html"><button class="button-85" role="button">Generate One-time-Key</button></a>

      </body>
    </html>
  `,
  };
}

// learn more about HTTP functions here: https://arc.codes/http

// let { jwt } = await Auth.signUserJWT({ address: "a12321312123" });

// let client = await arc.tables();

// // // create Chuck and Jana
// let chuck = await client.testdata.put({
//   //
//   oid: "123",
//   email: "chuck@example.com",
//   job: "Web Developer" + Math.random(),
//   age: 35,
// });

// console.log(chuck);

// // let chuck2 = await testdata.put({
// //   //
// //   oid: "1234",
// //   email: "chuck@example.com",
// //   job: "Web Developer",
// //   age: 35,
// // });

// // // let jana = await testdata.put({
// // //   email: "jana@example.com",
// // //   job: "Web Developer",
// // //   age: 64,
// // // });

// // // await client._doc.transactWrite({
// // //   TransactItems: [
// // //     { Put: { TableName: "testdata", Key: { email: chuck.email } } },
// // //     { Put: { TableName: "testdata", Key: { email: jana.email } } },
// // //   ],
// // // });

// // // scan the entire table for people over 64
// let retired = await client.testdata.scan({
//   FilterExpression: "age >= :givenAge",
//   ExpressionAttributeValues: { ":givenAge": 3 },
// });
// console.log(retired.Ites);
