'use client';

import { useAuth } from '@/store/useAuth';

export default function Home() {
  const { user } = useAuth();

  return (
    <main>
      <div className="p-6">
        <div className="text-xl font-semibold">Welcome {user.username}.</div>
      </div>
    </main>
  );
}
