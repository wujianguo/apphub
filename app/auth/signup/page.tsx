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
      <Card className="mx-auto w-[400px] max-w-sm border-0">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Create an account</CardTitle>
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
            Already have an account?{" "}
            <Link href={{ pathname: "/auth/login", query: { callbackUrl } }} className="underline">
              Log in
            </Link>
          </div>
        </CardContent>
      </Card>

    </section>
  )
}
