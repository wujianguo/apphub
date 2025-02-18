"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@repo/ui/components/avatar";
import { Button } from "@repo/ui/components/button";
import { UserDropdownMenuContent } from "./user-dropdown";
import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";
function useSession() {
  return {
    data: {
      user: {
        image: '',
        name: ''
      }
    },
    status: 'unauthenticated',
  }
}

export function UserButton() {
  const router = useRouter();
  const { data, status } = useSession();
  if (status === "unauthenticated") {
    return (
      <Button size="sm" className="h-7 px-3" onClick={() => {
        router.push("/auth/signin");
      }}>
        Sign in
      </Button>
    );
  }
  const user = data?.user;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="w-9 px-0">
          <Avatar className="size-6">
            <AvatarImage src={user?.image || ''} alt={user?.name || ''} />
            <AvatarFallback className="rounded-lg">{user?.name?.charAt(0) || ''}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      {user && <UserDropdownMenuContent user={user} />}
    </DropdownMenu>
  );
};
