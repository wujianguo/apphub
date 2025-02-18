"use client"

import {
  BadgeCheck,
  Bell,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar"
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@repo/ui/components/dropdown-menu"

import { useTheme } from "next-themes"
import { Icons } from "../icons"
// import { signOut } from "next-auth/react"
// import { User } from "next-auth"

function signOut(params: {redirectTo: string, redirect: boolean}) {

}

interface User {
  image?: string
  name: string
  email?: string
}

export function UserDropdownMenuContent({
  user,
  side,
}: {
  user: User,
  side?: "bottom" | "right"
}) {
  const { setTheme, theme, resolvedTheme } = useTheme()

  return (
    <DropdownMenuContent
      className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
      side={side}
      align="end"
      sideOffset={4}
    >
      <DropdownMenuLabel className="p-0 font-normal">
        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={user.image || ''} alt={user.name || ''} />
            <AvatarFallback className="rounded-lg">{user.name?.charAt(0) || ''}</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{user.name}</span>
            <span className="truncate text-xs">{user.email}</span>
          </div>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <Sparkles />
          Upgrade to Pro
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            {theme === "light" ? <Icons.sun /> : theme === "dark" ? <Icons.moon /> : <Icons.laptop />}
            <span>{resolvedTheme === "light" ? "Light" : "Dark"}</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Icons.sun className="mr-2 h-4 w-4" />
                <span>Light</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Icons.moon className="mr-2 h-4 w-4" />
                <span>Dark</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <Icons.laptop className="mr-2 h-4 w-4" />
                <span>System</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <BadgeCheck />
          Account
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CreditCard />
          Billing
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Bell />
          Notifications
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={() => {
        signOut({ redirectTo: "/", redirect: false });
      }}>
        <LogOut />
        Log out
      </DropdownMenuItem>
    </DropdownMenuContent>
  )
}