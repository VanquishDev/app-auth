import '@/config/amplify-configure';

import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

import { Providers } from '@/providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="md:container md:mx-auto h-screen flex justify-center items-center">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
