"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AuthUIProvider } from "@daveyplate/better-auth-ui"
import { authClient } from "@/lib/auth-client"
import { upload } from "@/lib/storage/client"

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
        providers={["github", "gitlab"]}
        credentials={false}
        magicLink={true}
        avatar
        uploadAvatar={async (file: File) => {
          const data = await upload(file, file.name, '/api/user/avatar/request');
          return data.url;
      }}
      >
        {children}
      </AuthUIProvider>
    </NextThemesProvider>
  )
}