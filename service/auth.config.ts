import type { NextAuthConfig } from "next-auth"
import { Provider } from "next-auth/providers"
import GitHub from "next-auth/providers/github"
import GitLab from "next-auth/providers/gitlab"

const providers: Provider[] = [GitHub({ allowDangerousEmailAccountLinking: true }), GitLab({ allowDangerousEmailAccountLinking: true })]

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: providers,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        return { ...token, id: user.id };
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session?.user && token.id) {
        session.user.id = `${token.id}`;
      }
      return session;
    },
  },
} satisfies NextAuthConfig
