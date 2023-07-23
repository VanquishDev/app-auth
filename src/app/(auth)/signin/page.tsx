'use client';

import { useState } from 'react';
import { useAuth } from '@/store/useAuth';
import { useRouter } from 'next/navigation';
import { Auth } from 'aws-amplify';
import { useForm } from 'react-hook-form';
import { useToast } from "@/components/ui/use-toast"
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
  const [loading, setLoading] = useState(false);

  const { toast } = useToast()

  const { register, handleSubmit, trigger } = useForm<LoginFields>({
    resolver: zodResolver(signUpSchema),
  });

  const router = useRouter();
  const { isAuthenticated, setIsAuthenticated, setUser } = useAuth();

  const onSubmit = async ({ username, password }: LoginFields) => {
    const isValid = await trigger();
    if (isValid) {
      try {
        setLoading(true);
        const currentUser = await Auth.signIn(username, password);
        setIsAuthenticated(currentUser ? true : false);
        setUser({
            username: currentUser.username,
            id: currentUser.attributes.sub,
            name: '',
            email: currentUser.attributes.email
        })
        currentUser && router.push('/');
        setLoading(false);
      } catch (error: any) {
        setIsAuthenticated(false);
        toast({
          title: error.message,
          description: '',
        })
        setLoading(false);
        console.log(error);
      }
    }
  };

  const onError = (error: any) => {
    console.log(error);
  };

  return (
    <div className="p-6 rounded-lg shadow-lg max-w-md bg-slate-50">
      <div className="text-center text-lg font-semibold">Entrar</div>
      <form
        className="mt-6 flex flex-col gap-6"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <div className="grid items-center gap-1.5">
          <Label>Username</Label>
          <Input type="text" id="username" {...register('username')} />
        </div>
        <div className="grid items-center gap-1.5">
          <Label>Password</Label>
          <Input type="password" id="password" {...register('password')} />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Button variant="outline">Submit</Button>
        </div>
        {loading && <div>autenticando...</div>}
      </form>
    </div>
  );
}
