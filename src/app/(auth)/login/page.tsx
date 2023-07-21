'use client';

import { useState } from 'react';
import { useAuth } from '@/context';
import { useRouter } from 'next/navigation';
import { Auth } from 'aws-amplify';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const signUpSchema = z.object({
  username: z.string().min(6, 'Username is required'),
  password: z.string().min(8, 'Password is required'),
});

type LoginFields = z.infer<typeof signUpSchema>;

export default function Page() {
  const [message, setMessage] = useState('');

  const { register, handleSubmit, trigger } = useForm<LoginFields>({
    resolver: zodResolver(signUpSchema),
  });

  const router = useRouter();
  const { handleUsernameChange } = useAuth();

  const onSubmit = async ({ username, password }: LoginFields) => {
    const isValid = await trigger();
    if (isValid) {
      try {
        setMessage('')
        const user = await Auth.signIn(username, password);
        handleUsernameChange(user.username);
        console.log(user);
        user && router.push('/');
      } catch (error: any) {
        setMessage(error.message);
        console.log(error);
      }
    }
  };

  const onError = (error: any) => {
    console.log(error);
  };

  return (
    <div
      className="container mx-auto h-screen flex justify-center items-center"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <form className="flex flex-col gap-6">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label>Username</Label>
          <Input type="text" id="username" {...register('username')} />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label>Password</Label>
          <Input type="password" id="password" {...register('password')} />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Button variant="outline">Submit</Button>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 text-center">{message}</div>
      </form>
    </div>
  );
}
