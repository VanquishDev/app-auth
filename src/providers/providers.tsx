'use client';

import { AuthProvider } from '@/context';

import PrivateRoute from '@/components/PrivateRoute';

import { usePathname } from 'next/navigation';
import { checkIsPublicRoute } from '@/functions';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  
  const pathname = usePathname();
  const isPublic = checkIsPublicRoute(pathname!);

  return (
    <AuthProvider>
      {isPublic && children}
      {!isPublic && <PrivateRoute>{children}</PrivateRoute>}
    </AuthProvider>
  );
};
