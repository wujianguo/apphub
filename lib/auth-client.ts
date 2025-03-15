import { createAuthClient } from "better-auth/react"
import { apiKeyClient, magicLinkClient, emailOTPClient, organizationClient, twoFactorClient } from "better-auth/client/plugins"; 

export const authClient = createAuthClient({
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
