import Handlebars from "handlebars";
import arc from "@architect/functions";
import { getButtonStyle } from "./getButton.mjs";

export const getSuccessfulHTML = async () => {
  let templateEngine = Handlebars.compile(/* html */ `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Thank you!</title>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; } body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; }
    </style>
    <link href="{{ tailwindCSS }}" rel="stylesheet" />

    ${getButtonStyle()}

  </head>
    <body class="p-8" style="">
      <h1 class="text-3xl mb-0 "> <span class="font-mono">AGĀPÉ</span> is Successfully Setup 🥳 </h1>
      <div class="text-lg mb-3 text-gray-500">Thank you for using AGAPE.</div>
      <div>See you around 🥰</div>
    </body>
  </html>
`);

  //

  let html = templateEngine({
    tailwindCSS: `${arc.static("/common/tailwind.min.css")}`,
  });
  return html;
};
