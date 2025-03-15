import { betterAuth } from "better-auth";
import { apiKey, bearer, emailOTP, magicLink, openAPI, organization, twoFactor, username } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { Resend } from "resend"
import { EmailTemplate } from "@daveyplate/better-auth-ui/server"
import prisma from '@/lib/prisma'

const resend = new Resend(process.env.RESEND_API_KEY)

export const auth = betterAuth({
  appName: "AppHub",
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  // emailAndPassword: {    
  //   enabled: true
  // },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      // const name = user.name || user.email.split("@")[0]
      console.log(token);
      console.log(request);
      await resend.emails.send({
        from: process.env.EMAIL_FROM || '',
        to: user.email,
        subject: "Verify your email address",
        react: EmailTemplate({
          action: "Verify Email",
          heading: "Verify Email",
          content: ' {`Hello ${name},`} Click the button below to verify your email address.',
          url,
        })
      });
    },
    autoSignInAfterVerification: true,
    sendOnSignUp: true
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    },
    gitlab: {
      clientId: process.env.GITLAB_CLIENT_ID || '',
      clientSecret: process.env.GITLAB_CLIENT_SECRET || '',
    }
  },
  plugins: [
    apiKey(),
    bearer(),
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        // Implement the sendVerificationOTP method to send the OTP to the user's email address //
        console.log(email);
        console.log(otp);
        console.log(type);
      },
    }),
    magicLink({
      sendMagicLink: async ({ email, token, url }, request) => {
        // send email to user
        // const name = user.name || user.email.split("@")[0]
        console.log(token);
        console.log(request);
        await resend.emails.send({
          from: process.env.EMAIL_FROM || '',
          to: email,
          subject: "Verify your email address",
          react: EmailTemplate({
            action: "Verify Email",
            heading: "Verify Email",
            content: ' {`Hello ${name},`} Click the button below to verify your email address.',
            url,
          })
        });  
      }
    }),
    openAPI(),
    organization({
      teams: {
        enabled: true,
      },
    }),
    // passkey(),
    twoFactor(),
    username(),
  ],
})