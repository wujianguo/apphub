
import { Injectable } from '@nestjs/common';
import { betterAuth } from "better-auth";
import { apiKey, bearer, emailOTP, magicLink, openAPI, organization, twoFactor, username } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class AuthService {
  auth: ReturnType<typeof betterAuth>;
  constructor(private readonly prisma: PrismaService) {
    this.auth = betterAuth({
      appName: "AppHub",
      database: prismaAdapter(prisma, {
        provider: "postgresql",
      }),
      // emailAndPassword: {    
      //   enabled: true
      // },
      plugins: [
        apiKey(),
        bearer(),
        emailOTP({
          async sendVerificationOTP({ email, otp, type }) {
            // Implement the sendVerificationOTP method to send the OTP to the user's email address //
          },
        }),
        magicLink({
          sendMagicLink: async ({ email, token, url }, request) => {
            // send email to user
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
    });
  }
}
