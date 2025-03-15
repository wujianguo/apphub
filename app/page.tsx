import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { SiteHeader } from "@/components/layout/header"

export default function IndexPage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <div className="flex-1">

        <section className="grid items-center gap-6 px-4 md:px-8 pb-8 pt-6 md:py-10">
          <div className="flex max-w-[980px] flex-col items-start gap-2">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
              Welcome to {siteConfig.name} <br className="hidden sm:inline" />
              {siteConfig.slogan}
            </h1>
            <p className="max-w-[700px] text-lg text-muted-foreground">
              {siteConfig.description}
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              href='teams'
              // target="_blank"
              // rel="noreferrer"
              className={buttonVariants()}
            >
              Get Started
            </Link>
            <Link
              target="_blank"
              rel="noreferrer"
              href={siteConfig.links.docs}
              className={buttonVariants({ variant: "outline" })}
            >
              Documentation
            </Link>
          </div>
        </section>
        </div>
     </div>
  )
}