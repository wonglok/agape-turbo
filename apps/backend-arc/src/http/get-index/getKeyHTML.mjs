import Handlebars from "handlebars";
import { getButtonStyle } from "./getButton.mjs";
import * as Auth from "@architect/shared/Auth.mjs";
// import arc from "@architect/functions";
// import path from "path";

export const getKeyHTML = async () => {
  let resources = {
    testing: await Auth.generateKeyPair(),
    staging: await Auth.generateKeyPair(),
    production: await Auth.generateKeyPair(),
  };

  let template = Handlebars.compile(/* html */ `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Welcome</title>

    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; } body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; }
    </style>

    <!-- <link href="{{ tailwindCSS }}" rel="stylesheet" /> -->

    <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">

    ${getButtonStyle()}
    <script>

      async function copyToClipBoard(domID, label, el) {
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
    <body class="p-8" style="">
      <h1 class="text-3xl mb-0 "><span class="font-mono">AGĀPÉ</span> Server Key Setup </h1>
      <div class="text-lg mb-3 text-gray-500 undeline">Let's backup this file at different places.</div>

      <div class="mb-3">
        <div class="mb-3 text-gray-600  max-w-lg">
          Here are the system encryption passwords for encyption for your server.
        </div>

        <div class="mb-6 text-black underline  max-w-lg">
          Please keep the key file safe for recovery and maintainance purpose.
        </div>

        <h2> <button  class="button-85 mb-5" role="button" onclick="copyToClipBoard('public-prod', 'JWT_B64_PUBLIC', this)">Copy Encryption Key</button></h2>

        <textarea id="public-prod" class="p-3 text-xs whitespace-pre" cols="60" rows="15">{{cmd}}</textarea>


      </div>
    </body>
  </html>
`);

  let html = template({
    cmd: `arc env -e testing --add ARC_APP_SECRET ${resources.testing.ARC_APP_SECRET}

arc env -e testing --add JWT_B64_PUBLIC ${resources.testing.JWT_B64_PUBLIC}

arc env -e testing --add JWT_B64_PRIVATE ${resources.testing.JWT_B64_PRIVATE}

arc env -e staging --add ARC_APP_SECRET ${resources.staging.ARC_APP_SECRET}

arc env -e staging --add JWT_B64_PUBLIC ${resources.staging.JWT_B64_PUBLIC}

arc env -e staging --add JWT_B64_PRIVATE ${resources.staging.JWT_B64_PRIVATE}

arc env -e production --add ARC_APP_SECRET ${resources.production.ARC_APP_SECRET}

arc env -e production --add JWT_B64_PUBLIC ${resources.production.JWT_B64_PUBLIC}

arc env -e production --add JWT_B64_PRIVATE ${resources.production.JWT_B64_PRIVATE}`,
  });

  return html;
};
