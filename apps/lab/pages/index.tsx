import { useEffect } from "react";
import { WebContainer } from "@webcontainer/api";
import "xterm/css/xterm.css";

export default function Docs() {
  useEffect(() => {}, []);
  return (
    <div>
      <h1>Welcome to AGAPE Lab</h1>
      <style
        dangerouslySetInnerHTML={{
          __html: /* css */ `
          * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          height: 100vh;
        }

        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          height: 100%;
          width: 100%;
        }

        textarea {
          width: 100%;
          height: 100%;
          resize: none;
          border-radius: 0.5rem;
          background: black;
          color: white;
          padding: 0.5rem 1rem;
        }

        iframe {
          height: 100%;
          width: 100%;
          border-radius: 0.5rem;
        }
      `,
        }}
      ></style>

      <div className="container">
        <div className="editor">
          <textarea defaultValue={`I am a textarea`}></textarea>
        </div>
        <div className="preview">
          <iframe id="frame" src="/loading"></iframe>
        </div>
      </div>
      <div id="terminal"></div>
    </div>
  );
}
