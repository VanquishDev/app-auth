'use client';

import { Auth } from 'aws-amplify';
import { useEffect } from 'react';

import { useRouter } from 'next/navigation';
import { APP_ROUTES } from '@/constants/app-routes';

import { useAuth } from '@/store/useAuth';

import Link from 'next/link';
import { Button } from './button';

export default function Nav() {
  const { isAuthenticated, reset } = useAuth();
  const { push } = useRouter();

  return (
    <nav className="absolute top-0 left-0">
      <Button variant="link">
        <Link href="/" className="mr-2">
          Home
        </Link>
      </Button>

      {isAuthenticated && (
        <Button variant="link">
          <Link href="/dashboard" className="mr-2">
            Dashboard
          </Link>
        </Button>
      )}

      {!isAuthenticated && (
        <Button variant="link">
          <Link href="/signup" className="mr-2">
            Sign Up
          </Link>
        </Button>
      )}

      {!isAuthenticated && (
        <Button variant="link">
          <Link href="/login">Login</Link>
        </Button>
      )}

      {isAuthenticated && (
        <Button variant="link">
          <Link href="/profile">Profile</Link>
        </Button>
      )}

      {isAuthenticated && (
        <Button variant="link">
          <Link href="/session">Session</Link>
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
          Logout
        </Button>
      )}
    </nav>
  );
}
