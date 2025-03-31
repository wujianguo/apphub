"use client";

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site"
import { Button, buttonVariants } from "@repo/ui/components/ui/button"
import { Icons } from "../icons"
// import { UserButton } from "@/components/user//user-button"
// import { UserButton } from "@daveyplate/better-auth-ui";


interface NavItem {
  title: string
  href: string
  disabled?: boolean
  external?: boolean
}

function Logo() {
  return (
    <Link href="/" className="flex items-center md:space-x-2">
      <Icons.logo className="size-6" aria-hidden="true" />
      <span className="hidden font-bold md:inline-block">
        {siteConfig.name}
      </span>
    </Link>
  )
}

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const items: NavItem[] = [
    { title: "Home", href: "/" },
    { title: "UDID", href: "/udid" },
    { title: "Documents", href: "/docs" },
  ];

  // Mobile top bar component
  const MobileTopBar = () => (
    <div
      className={`bg-background flex items-center justify-between px-4 h-16 ${!isMenuOpen ? "border-b border-border" : ""
        }`}
    >
      {/* Mobile menu toggle button */}
      <Button
        variant="ghost"
        onClick={toggleMenu}
        className="relative flex items-center justify-center h-9 w-9 -ml-2 [&_svg]:size-5"
      >
        <span
          className={`absolute transition-all duration-300 ${isMenuOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
            }`}
        >
          <Menu />
        </span>
        <span
          className={`absolute transition-all duration-300 ${isMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
            }`}
        >
          <X />
        </span>
      </Button>

      <div className="flex items-center absolute left-1/2 transform -translate-x-1/2 w-8 h-8">
        <Icons.logo className="size-6" aria-hidden="true" />
      </div>

      <div className="flex items-center gap-3 absolute right-4">
        {/* <UserButton /> */}
      </div>
    </div>
  );

  const NavItems = ({ isMobile = false }) => {
    // const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    // const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);

    const linkClasses = `font-medium ${isMobile ? "text-base" : "text-sm"} ${isMobile
      ? "text-muted-foreground"
      : "text-muted-foreground hover:bg-primary/5"
      } px-3 py-2 rounded-md`;

    return (
      <>
        {items.map(
          (item, index) =>
            item.href && (
              <Link
                key={index}
                href={item.href}
                className={linkClasses}
              >
                {item.title}
              </Link>
            )
        )}
      </>
    );
  };

  return (
    <header className="sticky h-16 top-0 z-40 w-full border-b bg-background">
      <div className="hidden lg:block">
        <div className="flex h-16 items-center px-4 md:px-8 space-x-4 sm:justify-between sm:space-x-0">

          <div className="flex gap-6 md:gap-10">
            <Logo />

            <nav className="flex gap-6">
              <NavItems />
            </nav>
          </div>

          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-1">
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({ variant: "ghost", size: "icon" })}
              >
                <Icons.github className="size-4" />
                <span className="sr-only">Github</span>
              </Link>
              {/* <UserButton /> */}
            </nav>
          </div>
        </div>
      </div>

      <nav className="lg:hidden">
        <MobileTopBar />
      </nav>

      {isMenuOpen && (
        <div className="lg:hidden">
          <nav className="bg-background border-b border-border">
            <div className="flex flex-col gap-2 px-4 py-2">
              <NavItems isMobile />
            </div>
          </nav>
        </div>)}
    </header>
  )
}