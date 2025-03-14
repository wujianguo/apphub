'use client';
import { Button } from '@repo/ui/components/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@repo/ui/components/form';
import { Input } from '@repo/ui/components/input';
import { zodResolver } from '@hookform/resolvers/zod';
// import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
// import { SignInPageErrorParam } from '@auth/core/types';
import { z } from 'zod';
import Gitlab3SignInButton from './gitlab3-auth-button';
// import { useToast } from "@/hooks/use-toast"
import { Loader2 } from 'lucide-react';

// const signinErrors: Record<SignInPageErrorParam | "default", string> = {
//   default: "Unable to sign in.",
//   Signin: "Try signing in with a different account.",
//   OAuthSignin: "Try signing in with a different account.",
//   OAuthCallbackError: "Try signing in with a different account.",
//   OAuthCreateAccount: "Try signing in with a different account.",
//   EmailCreateAccount: "Try signing in with a different account.",
//   Callback: "Try signing in with a different account.",
//   OAuthAccountNotLinked:
//     "To confirm your identity, sign in with the same account you used originally.",
//   EmailSignin: "The e-mail could not be sent.",
//   CredentialsSignin:
//     "Sign in failed. Check the details you provided are correct.",
//   SessionRequired: "Please sign in to access this page.",
// };

const formSchema = z.object({
  email: z.string().endsWith('@haixue.com').email({ message: 'Enter a valid email address' })
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  // const { status } = useSession();
  // const router = useRouter();
  const searchParams = useSearchParams();
  // const { toast } = useToast()
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const callbackUrl = searchParams.get('callbackUrl');
  // if (status === "authenticated") {
  //   if (callbackUrl) {
  //     router.push(callbackUrl);
  //   } else {
  //     router.push('/apps');
  //   }
  // }
  const error = searchParams.get('error') || '';
  const defaultValues = {
    email: ''
  };
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (!mounted) return;
    if (error) {
      // toast({
      //   variant: "destructive",
      //   title: error,
      //   description: signinErrors[error as SignInPageErrorParam] || signinErrors.default,
      // });
    }
  }, [error, mounted]);
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: UserFormValue) => {
    setLoading(true);
    // setTimeout(() => {
    //   console.log('data', data);
    //   setLoading(false);
    // }, 2000);
    // await signIn('nodemailer', {
    //   email: data.email,
    //   callbackUrl: callbackUrl ?? '/apps'
    // });
    setLoading(false);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={loading} className="ml-auto w-full" type="submit">
            {loading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Continue With Email
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Gitlab3SignInButton />
    </>
  );
}
