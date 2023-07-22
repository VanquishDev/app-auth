import { getWithSSRContext } from "@/config/amplify-ssr";

export default async function Session() {
  const SSR = getWithSSRContext();
  const currentUser = await SSR.Auth.currentAuthenticatedUser();
  console.log(currentUser)

  const { attributes } = currentUser

  return (
    <div className="p-6">
      <div className='text-xl font-semibold'>Welcome to the Session.</div>
      <pre className='mt-10'>{JSON.stringify({ attributes }, null, 4)}</pre>
    </div>
  );
}

