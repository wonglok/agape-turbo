import { Button } from "agape-ui";
import { LoginButton } from "../components/LoginButton/LoginButton";
import { AccessToken } from "../components/AccessToken/AccessToken";
import { EmailSignIn } from "../components/EmailSignin/EmailSignin";

export default function Docs() {
  return (
    <div>
      <h1>Boilerplate</h1>
      <Button />
      <EmailSignIn></EmailSignIn>
      <AccessToken></AccessToken>
      <LoginButton></LoginButton>
    </div>
  );
}
