'use client';

import { useAuth } from '@/store/useAuth';

export default function Profile() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="p-6">
      <div className='text-xl font-semibold'>Bem vindo ao Perfil.</div>
      <pre className='mt-10'>{JSON.stringify({ isAuthenticated, user }, null, 4)}</pre>
    </div>
  );
}
