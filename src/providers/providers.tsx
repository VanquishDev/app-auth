'use client';

import AmplifyProvider from '@/app/(auth)/provider';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AmplifyProvider>{children}</AmplifyProvider>
    </>
  );
};
