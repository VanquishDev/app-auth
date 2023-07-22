'use client';

import { Auth } from 'aws-amplify';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

import { APP_ROUTES } from '@/constants/app-routes';
import { useAuth } from '@/store/useAuth';

type PrivateRouteProps = {
  children: ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { push } = useRouter();
  const { isAuthenticated, setIsAuthenticated, setUser, reset } = useAuth();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await Auth.currentAuthenticatedUser();
        setIsAuthenticated(currentUser ? true : false);
        setUser({
          username: currentUser.username,
          id: currentUser.attributes.sub,
          name: '',
          email: currentUser.attributes.email,
        });
      } catch (error) {
        console.log(error);
        reset();
        push(APP_ROUTES.public.login);
      }
    };

    checkUser();

    return () => {
      setIsAuthenticated(false);
    };
  }, []);

  return (
    <>
      {!isAuthenticated && null}
      {isAuthenticated && children}
    </>
  );
};

export default PrivateRoute;
