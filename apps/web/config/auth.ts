import { createAuthClient } from "better-auth/react"
import { apiKeyClient, magicLinkClient, emailOTPClient, organizationClient, twoFactorClient } from "better-auth/client/plugins"; 

export const authClient = createAuthClient({
  baseURL: process.env.API_URL,
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
