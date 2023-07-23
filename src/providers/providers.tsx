'use client';

import { ThemeProvider } from './theme-provider';
import { Toaster } from "@/components/ui/toaster"

import PrivateRoute from '@/components/PrivateRoute';
import PublicRoute from '@/components/PublicRoute';
import Nav from '@/components/Nav';

import { usePathname } from 'next/navigation';
import { checkIsPublicRoute } from '@/functions';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isPublic = checkIsPublicRoute(pathname!);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Nav />
      <Toaster />
      {isPublic && <PublicRoute>{children}</PublicRoute>}
      {!isPublic && <PrivateRoute>{children}</PrivateRoute>}
    </ThemeProvider>
  );
};
