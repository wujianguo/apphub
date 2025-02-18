"use client";

// import { signIn } from 'next-auth/react';
import { Button } from "@repo/ui/components/button";
import { Icons } from "@/components/icons";

export const Social = () => {
  const onClick = (provider: "gitlab3" | "github") => {
    console.log("provider", provider);
    // signIn(provider);
  }

  return (
    <div className="flex w-full items-center gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick("gitlab3")}
      >
        {/* <FcGoogle className="h-5 w-5" /> */}
        <Icons.gitlab className="h-5 w-5" />
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick("github")}
      >
        {/* <FaGithub className="h-5 w-5" /> */}
        <Icons.github className="h-5 w-5" />
      </Button>
    </div>
  );
};
