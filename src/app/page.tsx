'use client';

import { Amplify } from 'aws-amplify';
import awsExports from '@/aws-exports';

Amplify.configure({ ...awsExports, ssr: true });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      App-Auth
    </main>
  );
}
