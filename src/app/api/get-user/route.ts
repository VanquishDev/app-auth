import { getWithSSRContext } from "@/config/amplify-ssr";

export async function GET(request: Request) {
  const SSR = getWithSSRContext();
  const currentUser = await SSR.Auth.currentAuthenticatedUser();

  return new Response(JSON.stringify(currentUser))
}
