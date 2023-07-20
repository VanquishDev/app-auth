'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

import { Inter } from 'next/font/google';
import './globals.css';

import { usePathname } from 'next/navigation';
import { checkIsPublicRoute } from '@/functions';

import PrivateRoute from '@/components/PrivateRoute';

const inter = Inter({ subsets: ['latin'] });

import { Providers } from '@/providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isPublic = checkIsPublicRoute(pathname!);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Button variant="link">
          <Link href="/" className="mr-2">
            Home
          </Link>
        </Button>

        <Button variant="link">
          <Link href="/dashboard" className="mr-2">
            Dashboard
          </Link>
        </Button>

        <Button variant="link">
          <Link href="/signup" className="mr-2">
            Sign Up
          </Link>
        </Button>

        <Button variant="link">
          <Link href="/login">Login</Link>
        </Button>

        <Providers>
          {isPublic && children}
          {!isPublic && <PrivateRoute>{children}</PrivateRoute>}
        </Providers>
      </body>
    </html>
  );
}
