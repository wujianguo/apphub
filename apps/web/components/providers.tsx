"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AuthUIProvider } from "@daveyplate/better-auth-ui"
import { authClient } from "@/config/auth"

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      <AuthUIProvider
        authClient={authClient}
        navigate={router.push}
        replace={router.replace}
        onSessionChange={() => router.refresh()}
        LinkComponent={Link}
      >
        {children}
      </AuthUIProvider>
    </NextThemesProvider>
  )
}
