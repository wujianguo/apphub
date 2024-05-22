"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { LogoutButton } from "./logout-button";

export function UserButton() {
  // const user = useCurrentUser();
  const session = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="w-9 px-0">
          <Avatar className="size-6">
            <AvatarImage src={session?.data?.user?.image || ""} />
            <AvatarFallback>
              <Icons.user />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <LogoutButton>
          <DropdownMenuItem>
            <Icons.logout className="mr-2 size-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
