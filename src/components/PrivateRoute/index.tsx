'use client';

import { Auth } from 'aws-amplify';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

import { APP_ROUTES } from '@/constants/app-routes';
import { useAuth } from '@/store/useAuth';

type PrivateRouteProps = {
  children: ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { push } = useRouter();
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await Auth.currentAuthenticatedUser();
        setIsAuthenticated(currentUser ? true : false);
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
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
