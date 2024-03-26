import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { MobileNav } from "./mobile-nav"

export function SiteHeader() {
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <MobileNav items={siteConfig.mainNav} />
            <Link
              href={"/apps/create"}
              className="md:block hidden"
            >
              <div
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })}
              >
                <Icons.plus className="h-5 w-5" />
                <span className="sr-only">Create an application</span>
              </div>
            </Link>
            <Link
              href={"/docs"}
              target="_blank"
              className="md:block hidden"
            >
              <div
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })}
              >
                <Icons.docs className="h-5 w-5" />
                <span className="sr-only">Documents</span>
              </div>
            </Link>

            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="md:block hidden"
            >
              <div
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })}
              >
                <Icons.gitHub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <div className="md:block hidden">
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
