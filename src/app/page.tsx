'use client';

import { useAuth } from '@/context';

export default function Home() {
  const { username } = useAuth();
  return username ? (
    <main className="container pt-6">Hello, {username}.</main>
  ) : (
    <main className="container pt-6">Hello, guest.</main>
  );
}
