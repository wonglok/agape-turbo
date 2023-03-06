import { useSession, signIn, signOut } from "next-auth/react";
export function AccessToken() {
  const { data } = useSession();

  return <div>Access Token: {JSON.stringify(data)}</div>;
}
