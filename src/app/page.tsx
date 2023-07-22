'use client';

import { useAuth } from '@/store/useAuth';

export default function Home() {
  const { user } = useAuth();

  return user && user.id ? (
    <main className="">Hello, {user.username}.</main>
  ) : (
    <main className="">Hello, guest.</main>
  );
}
