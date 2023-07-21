import { getWithSSRContext } from "@/config/amplify-ssr";

export default async function Session() {
  const SSR = getWithSSRContext();
  const currentUser = await SSR.Auth.currentAuthenticatedUser();
  return (
    <div className="br">
      <pre>{JSON.stringify({currentUser}, null, 4)}</pre>
    </div>
  );
}