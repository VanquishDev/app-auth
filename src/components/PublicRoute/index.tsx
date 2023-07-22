'use client';

import { Auth } from 'aws-amplify';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

import { APP_ROUTES } from '@/constants/app-routes';
import { useAuth } from '@/store/useAuth';

type PublicRouteProps = {
  children: ReactNode;
};

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { setIsAuthenticated, setUser } = useAuth();

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
      } catch (error) { }
    };

    checkUser();

    return () => {
      setIsAuthenticated(false);
    };
  }, []);

  return (
    <>
      {children}
    </>
  );
};

export default PublicRoute;
