import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@repo/ui/globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "@repo/ui/components/sonner"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Apphub",
  description: "A self-hosted service that helps you distribute Android, iOS, macOS, tvOS, Linux, Windows apps, you can release builds to testers and public app stores.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
      >
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
