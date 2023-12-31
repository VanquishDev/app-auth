'use client';

import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { useAuth } from '@/store/useAuth';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast"

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
  const [loading, setLoading] = useState(false);
  const [isConfirmation, setConfirmation] = useState(false);

  const { toast } = useToast()
  
  const methods = useForm<SignUpFields>({
    resolver: zodResolver(signUpSchema),
  });

  const { register, handleSubmit } = useForm<ConfirmationFields>({
    resolver: zodResolver(confirmationSchema),
  });

  const router = useRouter();

  const { isAuthenticated, setIsAuthenticated, setUser } = useAuth();

  const onSubmit = async ({
    username,
    email,
    password,
    name,
  }: SignUpFields) => {
    const isValid = await methods.trigger();
    if (isValid) {
      try {
        setLoading(true);
        const input = {
          username,
          password,
          attributes: {
            name,
            email,
            phone_number: null,
          },
          autoSignIn: {
            enabled: true,
          },
        };
        console.log(input);
        const { user } = await Auth.signUp(input);
        console.log(user);
        user && setConfirmation(true);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        toast({
          title: error.message,
          description: '',
        });
        console.log(error);
      }
    }
  };

  const confirmCode = async ({
    confirmationCode,
    username,
  }: ConfirmationFields) => {
    try {
      setLoading(true);
      const r = await Auth.confirmSignUp(username, confirmationCode);

      if (r === 'SUCCESS') {
        router.push('/signin');
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast({
        title: error.message,
        description: '',
      });
      console.log(error);
    }
  };

  return (
    <div className="p-6 rounded-lg shadow-lg max-w-md bg-slate-50">
      {isConfirmation ? (
        <div>
          <div className="text-center text-lg font-semibold">
            Confirmar código
          </div>
          <form
            className="mt-6 flex flex-col gap-6"
            onSubmit={handleSubmit(confirmCode)}
          >
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
              <Button variant="outline">Submit</Button>
            </div>
            {loading && <div>validando...</div>}
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Button variant="link" onClick={() => setConfirmation(false)}>
                Criar uma conta
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <div className="text-center text-lg font-semibold">
            Criar uma conta
          </div>
          <form
            className="mt-6 flex flex-col gap-6"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
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
              <Button variant="outline">Submit</Button>
            </div>
            {loading && <div>registrando...</div>}
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Button variant="link" onClick={() => setConfirmation(true)}>
                Confirmar código
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
