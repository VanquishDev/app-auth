'use client';

import { Auth } from 'aws-amplify';
import { useAuth } from '@/context';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { APP_ROUTES } from '@/constants/app-routes';

export default function Profile() {
  const { username, handleUsernameChange } = useAuth();
  const { push } = useRouter();

  useEffect(() => {
    console.log('Profile');
    const getUser = async () => {
      const currentUser = await Auth.currentAuthenticatedUser();
      if (currentUser) {
        console.log('getUser', currentUser);
        handleUsernameChange(currentUser.username);
      }
    };
    getUser();
    return () => {};
  }, []);

  return (
    <div className="container mx-auto h-screen flex justify-center items-center">
      Profile
      {username}
      <Button variant="link" onClick={async ()=>{
        await Auth.signOut()
        handleUsernameChange('');
        push(APP_ROUTES.public.home);
      }}>
  logout
          </Button>
    </div>
  );
}
