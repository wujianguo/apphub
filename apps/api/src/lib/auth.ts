// import { PrismaClient } from "@prisma/client";
// import { betterAuth } from "better-auth";
// import { apiKey,bearer, emailOTP, magicLink, openAPI, organization, twoFactor, username } from "better-auth/plugins";
// import { prismaAdapter } from "better-auth/adapters/prisma";

// const prisma = new PrismaClient();
// export const auth = betterAuth({
//   appName: "AppHub",
//   database: prismaAdapter(prisma, {
//     provider: "postgresql",
//   }),
//   // emailAndPassword: {    
//   //   enabled: true
//   // },
//   plugins: [
//     apiKey(),
//     bearer(),
//     emailOTP({ 
//       async sendVerificationOTP({ email, otp, type}) { 
//         // Implement the sendVerificationOTP method to send the OTP to the user's email address //
//       },
//     }),
//     magicLink({
//       sendMagicLink: async ({ email, token, url }, request) => {
//         // send email to user
//       }
//     }),
//     openAPI(),
//     organization({
//       teams: {
//         enabled: true,
//       },
//     }),
//     // passkey(),
//     twoFactor(),
//     username(),
//   ],
// });
