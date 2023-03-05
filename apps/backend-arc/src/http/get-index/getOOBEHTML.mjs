import Handlebars from "handlebars";
import arc from "@architect/functions";
import { getButtonStyle } from "./getButton.mjs";
import { getKeyHTML } from "./getKeyHTML.mjs";

export const getOOBEHTML = async () => {
  let keyHTMLData = await getKeyHTML();

  let templateForOOBE = Handlebars.compile(/* html */ `
<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Welcome</title>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; } body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; }
    </style>
    <link href="{{ tailwindCSS }}" rel="stylesheet" />
    <script src="{{ axios }}"></script>

    ${getButtonStyle()}

    <!--  -->
    <script type="text" id="keyHTMLData">${encodeURIComponent(
      JSON.stringify(keyHTMLData)
    )}</script>

    <!--  -->
    <script>
      async function setupYourKeys(el) {
        //
        let raw = document.querySelector('#keyHTMLData').innerHTML;
        let jsonString = decodeURIComponent(raw);
        let setupHTML = JSON.parse(jsonString);

        let href = document.createElement('a');
        href.href = URL.createObjectURL(new Blob([setupHTML], {type:'text/html'}));
        href.download = 'key-backup-file.html';

        href.click();

        el.innerHTML = 'Downloaded, Thank you!'
      }
    </script>

  </head>
    <body class="p-8" style="">
      <h1 class="text-3xl mb-0 ">Welcome to <span class="font-mono">AGĀPÉ</span>  </h1>
      <div class="text-lg mb-3 text-gray-500">Let's setup your system!</div>

      <div class="mb-3">
        <h1 class="text-2xl">Systems Ready...</h1>
        <div class="mb-3 text-gray-600  max-w-lg">
          You can click the button below to automactially generate the system keys for encrpyiton and system management.
        </div>

        <div class="mb-3 text-black underline max-w-sm">
          Please backup the key file safe at multiple places...
        </div>

        <button class="button-85 my-2" onclick="setupYourKeys(this)">Generate New Keys & Instruction</button>
      </div>
    </body>
  </html>
`);

  let html = templateForOOBE({
    jsEntry: `${arc.static("/setup/index.js")}`,
    axios: `${arc.static("/common/axios.js")}`,
    tailwindCSS: `${arc.static("/common/tailwind.min.css")}`,
  });
  return html;
};
