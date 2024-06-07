'use client'

import { signIn } from "next-auth/react";
import { SocialButtons } from "../components/social";

export default function LoginPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <SocialButtons socialTypes={['github', 'gitlab']} onClick={(provider) => {
        signIn(provider, { callbackUrl: '/user/profile' })
      }} />
    </section>
  )
}
