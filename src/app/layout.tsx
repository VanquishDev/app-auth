import "@/config/amplify-configure";

import Link from 'next/link';
import { Button } from '@/components/ui/button';

import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

import { Providers } from '@/providers';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="p-4 font-bold">app-auth.component</div>
        <nav>
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

          <Button variant="link">
            <Link href="/profile">Profile</Link>
          </Button>
        </nav>

        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
