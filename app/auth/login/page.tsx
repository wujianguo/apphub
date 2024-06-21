'use client'

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { SocialButtons } from "../components/social";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <Card className="mx-auto max-w-sm border-0 md:w-[400px]">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Log in to AppHub</CardTitle>
          {/* <CardDescription>
            Enter your email below to login to your account
          </CardDescription> */}
        </CardHeader>
        <CardContent>
          <div>
            <SocialButtons socialTypes={['github', 'gitlab']} onClick={(provider) => {
              signIn(provider, { callbackUrl: callbackUrl || '/user/profile' })
            }} />
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href={{ pathname: "/auth/register", query: { callbackUrl } }} className="underline">
              Register
            </Link>
          </div>
        </CardContent>
      </Card>

    </section>
  )
}
