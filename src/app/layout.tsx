'use client';

import { Inter } from 'next/font/google';
import './globals.css'

import { usePathname } from 'next/navigation';
import { checkIsPublicRoute } from '@/functions';
import PrivateRoute from '@/components/PrivateRoute';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isPublic = checkIsPublicRoute(pathname!)
  console.log(isPublic)

  return (
    <html lang="en">
      <body className={inter.className}>
        {isPublic && children}
        {!isPublic && <PrivateRoute>{children}</PrivateRoute>}
      </body>
    </html>
  )
}
