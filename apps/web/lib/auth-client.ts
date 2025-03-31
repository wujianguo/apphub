import { createAuthClient } from "better-auth/react"
import { apiKeyClient, magicLinkClient, emailOTPClient, organizationClient, twoFactorClient } from "better-auth/client/plugins"; 

// @ts-ignore
export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_SERVER,
  plugins: [
    apiKeyClient(),
    magicLinkClient(),
    emailOTPClient(),
    organizationClient({
      teams: {
        enabled: true
      }
    }),
    twoFactorClient(),
  ]
})