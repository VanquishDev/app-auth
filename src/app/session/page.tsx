'use client';

import { useAuth } from '@/store/useAuth';

export default function Session() {
  const { isAuthenticated, user } = useAuth()

  // const SSR = getWithSSRContext();
  // const currentUser = await SSR.Auth.currentAuthenticatedUser();
  // console.log(currentUser)

  // const { attributes } = currentUser

  return (
    <div className="p-6">
      <div className='text-xl font-semibold'>Welcome to the Session.</div>
      <pre className='mt-10'>{JSON.stringify({ isAuthenticated, user }, null, 4)}</pre>
    </div>
  );
}

