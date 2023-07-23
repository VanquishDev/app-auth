'use client';

import { Auth } from 'aws-amplify';
import { useAuth } from '@/store/useAuth';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { APP_ROUTES } from '@/constants/app-routes';

export default function Page() {
  const { reset } = useAuth();
  const { push } = useRouter();

  useEffect(() => {
    console.log('signout')
    const logout = async () => {
      await Auth.signOut();
      reset();
      push(APP_ROUTES.public.home);
    };
    logout();
    return () => {};
  }, [push, reset]);

  return <div>Até breve...</div>;
}
