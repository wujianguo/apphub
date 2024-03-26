"use client"

import * as React from "react"
import Link from "next/link"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { Button, buttonVariants } from "./ui/button"
import { ThemeToggle } from "./theme-toggle"

interface MobileNavProps {
  items?: NavItem[]
}

export function MobileNav({ items }: MobileNavProps) {
  const [open, setOpen] = React.useState(false)
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Icons.menu className="h-5 w-5" />

          <span className="sr-only">Toggle Menu</span>
        </Button>

      </SheetTrigger>

      <SheetContent>
        <Link
          href="/"
          className="flex items-center"
          onClick={() => setOpen(false)}
        // onOpenChange={setOpen}
        >
          <Icons.logo className="mr-2 h-4 w-4" />
          <span className="font-bold">{siteConfig.name}</span>
        </Link>
        <nav className="flex flex-col gap-4 pt-4">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center text-sm font-medium text-muted-foreground",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>

        <div className="flex flex-1 items-center space-x-4 pt-4">
          <nav className="flex items-center space-x-1">

            <Link
              href={"/apps/create"}
              onClick={() => setOpen(false)}
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
              onClick={() => setOpen(false)}
              target="_blank"
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
              onClick={() => setOpen(false)}
              target="_blank"
              rel="noreferrer"
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
            <ThemeToggle />
          </nav>
        </div>

      </SheetContent>
    </Sheet>
  )
}
