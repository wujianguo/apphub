import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Welcome to AppHub <br className="hidden sm:inline" />
          release apps for every platform.
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          A platform that helps you distribute Android, iOS, macOS, tvOS, Linux, Windows apps, 
          you can release builds to testers and public app stores.
        </p>
      </div>
      <div className="flex gap-4">
        <Link
          href='apps'
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
  )
}
