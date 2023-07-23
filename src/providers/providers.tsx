'use client';

import PrivateRoute from '@/components/PrivateRoute';
import PublicRoute from '@/components/PublicRoute';
import Nav from '@/components/Nav';

import { usePathname } from 'next/navigation';
import { checkIsPublicRoute } from '@/functions';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isPublic = checkIsPublicRoute(pathname!);

  return (
    <>
      <Nav />
      {isPublic && <PublicRoute>{children}</PublicRoute>}
      {!isPublic && <PrivateRoute>{children}</PrivateRoute>}
    </>
  );
};
