'use client';

import { Auth } from 'aws-amplify';
import { useEffect } from 'react';

import { useRouter } from 'next/navigation';
import { APP_ROUTES } from '@/constants/app-routes';

import { useAuth } from '@/store/useAuth';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

import ToggleTheme from './ToggleTheme'

export default function Nav() {
  const { isAuthenticated, reset } = useAuth();
  const { push } = useRouter();

  return (
    <nav className="absolute top-0 left-0">
      <div className="flex flex-wrap justify-between">
        <div>
          <Button variant="link">
            <Link href="/" className="mr-2">
              HOME
            </Link>
          </Button>

          {isAuthenticated && (
            <Button variant="link">
              <Link href="/dashboard" className="mr-2">
                DASHBOARD
              </Link>
            </Button>
          )}

          {isAuthenticated && (
            <Button variant="link">
              <Link href="/admin" className="mr-2">
                ADMIN
              </Link>
            </Button>
          )}

          {!isAuthenticated && (
            <Button variant="link">
              <Link href="/signup" className="mr-2">
                CRIAR UMA CONTA
              </Link>
            </Button>
          )}

          {!isAuthenticated && (
            <Button variant="link">
              <Link href="/signin">ENTRAR</Link>
            </Button>
          )}

          {isAuthenticated && (
            <Button variant="link">
              <Link href="/profile">PERFIL</Link>
            </Button>
          )}

          {isAuthenticated && (
            <Button
              variant="link"
              onClick={async () => {
                await Auth.signOut();
                reset();
                push(APP_ROUTES.public.home);
              }}
            >
              DESCONECTAR
            </Button>
          )}
        </div>
        <ToggleTheme />
      </div>
    </nav>
  );
}
