import type { NextAuthConfig } from "next-auth"
import { Provider } from "next-auth/providers"
import GitHub from "next-auth/providers/github"
import GitLab from "next-auth/providers/gitlab"
// import Resend from "next-auth/providers/resend"
 
// const providers: Provider[] = [Resend({
//   from: process.env.AUTH_RESEND_FROM,
// }), GitHub, GitLab]

const providers: Provider[] = [GitHub, GitLab]

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: providers,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
} satisfies NextAuthConfig
