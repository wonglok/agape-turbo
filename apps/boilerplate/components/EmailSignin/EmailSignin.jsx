import { signIn } from "next-auth/react";
import { useRef } from "react";

export function EmailSignIn({}) {
  let ref = useRef();
  return (
    <div>
      <input ref={ref}></input>
      <button
        onClick={() => {
          signIn("email", { email: ref.current.value });
        }}
      >
        Sign in with Email
      </button>
    </div>
  );
}
