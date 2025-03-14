'use client';

import { useSearchParams } from 'next/navigation';
// import { signIn } from 'next-auth/react';
import { Button } from '@repo/ui/components/button';
import { Icons } from '@/components/icons';
import { authClient } from '@/config/auth';

export default function Gitlab3SignInButton() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  return (
    <Button
      className="w-full"
      variant="outline"
      type="button"
      onClick={() => {
        console.log('');
        authClient.signIn.social({
          provider: "github"
        }).then((data) => {
          console.log('data', data);
        }).catch((err) => {
          console.log('error', err);
        })

        // signIn('gitlab3', { redirectTo: callbackUrl ?? '/apps' })
      }}
    >
      <Icons.gitlab className="mr-2 h-4 w-4" />
      Continue with GitLab
    </Button>
  );
}
