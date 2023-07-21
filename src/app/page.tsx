'use client';

import { useAuth } from "@/context";

export default function Home() {
  const { username }  = useAuth()
  return (
    <main className="container mx-auto h-screen flex justify-center items-center">
      Hello, {username}.
    </main>
  );
}
