import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import GitHub from "next-auth/providers/github"
import GitLab from "next-auth/providers/gitlab"
import Resend from "next-auth/providers/resend"
import type { Provider } from "next-auth/providers"
import prisma from "@/lib/prisma"

const providers: Provider[] = [Resend, GitHub, GitLab]

export const { signIn, signOut, auth, handlers } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: providers,
})

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider()
    return { id: providerData.id, name: providerData.name }
  } else {
    return { id: provider.id, name: provider.name }
  }
})
