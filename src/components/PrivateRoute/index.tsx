'use client';

import { Auth } from 'aws-amplify';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

import { APP_ROUTES } from '@/constants/app-routes';

type PrivateRouteProps = {
  children: ReactNode; 
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { push } = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      try {
        const currentUser = await Auth.currentAuthenticatedUser();
        setIsAuthenticated(currentUser ? true : false)
        setChecked(true)
      } catch (error) {
        console.log(error)
        setIsAuthenticated(false)
        setChecked(false)
      }
    };
    getUser();
    return () => {
      setIsAuthenticated(false)
      setChecked(false)
    }
  }, []);

  useEffect(() => {
    if (checked && !isAuthenticated) {
      push(APP_ROUTES.public.login);
    }
  }, [isAuthenticated, checked, push]);

  return (
    <>
      {!isAuthenticated && null}
      {isAuthenticated && children}
    </>
  );
};

export default PrivateRoute;
