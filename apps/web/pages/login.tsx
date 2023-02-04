import { Button } from "ui";
import { loginMetamask } from "../backend/backend";
export default function Web() {
  return (
    <div>
      <h1>Login</h1>
      <button
        onClick={() => {
          //
          loginMetamask();
        }}
      >
        loginMetamask
      </button>
    </div>
  );
}
