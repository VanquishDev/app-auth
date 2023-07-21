'use client';

import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const signUpSchema = z.object({
  name: z.string().min(1, 'Username is required'),
  username: z.string().min(1, 'Username is required'),
  email: z.string().email().min(6, 'Email is required'),
  password: z.string().min(8, 'Password is required'),
});

const confirmationSchema = z.object({
  username: z.string(),
  confirmationCode: z.string(),
});

type SignUpFields = z.infer<typeof signUpSchema>;

type ConfirmationFields = z.infer<typeof confirmationSchema>;

export default function Page() {
  const [message, setMessage] = useState('');
  const [isConfirmation, setConfirmation] = useState(false);

  const methods = useForm<SignUpFields>({
    resolver: zodResolver(signUpSchema),
  });

  const { register, handleSubmit } = useForm<ConfirmationFields>({
    resolver: zodResolver(confirmationSchema),
  });

  const router = useRouter();

  const onSubmit = async ({ username, email, password, name }: SignUpFields) => {
    const isValid = await methods.trigger();
    if (isValid) {
      try {
        setMessage('')
        const { user } = await Auth.signUp({
          username,
          password,
          attributes: {
            name,
            email,
            phone_number: null,
          },
          autoSignIn: {
            enabled: false,
          },
        });
        console.log('Auth.signUp', user);
        user && setConfirmation(true);
      } catch (error: any) {
        setMessage(error.message)
        console.log(error);
      }
    }
  };

  const confirmCode = async ({
    confirmationCode,
    username,
  }: ConfirmationFields) => {
    try {
      await Auth.confirmSignUp(username, confirmationCode);
      router.push('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isConfirmation ? (
        <div
          className="container mx-auto h-screen flex justify-center items-center"
          onSubmit={handleSubmit(confirmCode)}
        >
          <form className="flex flex-col gap-6">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label>Username</Label>
              <Input type="text" id="username" {...register('username')} />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label>Confirmation code</Label>
              <Input
                type="text"
                id="confirmationCode"
                {...register('confirmationCode')}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Button>Submit</Button>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Button variant='link' onClick={() => setConfirmation(false)}>Sign Up</Button>
            </div>
          </form>
        </div>
      ) : (
        <div
          className="container mx-auto h-screen flex justify-center items-center"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <form className="flex flex-col gap-6">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label>Name</Label>
              <Input type="text" id="name" {...methods.register('name')} />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label>Email</Label>
              <Input type="email" id="email" {...methods.register('email')} />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label>Username</Label>
              <Input
                type="text"
                id="username"
                {...methods.register('username')}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label>Password</Label>
              <Input
                type="password"
                id="password"
                {...methods.register('password')}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Button variant='outline' >Submit</Button>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Button variant='link'  onClick={() => setConfirmation(true)}>
                Confirmation Code
              </Button>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5 text-center">{message}</div>
          </form>
        </div>
      )}
    </>
  );
}
