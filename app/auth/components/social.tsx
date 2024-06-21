"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

export type SocialTypes = "google" | "github" | "gitlab";

export function SocialButtons(props: { socialTypes: SocialTypes[], onClick: (provider: SocialTypes) => void }) {

  const socialIcons = (provider: SocialTypes) => {
    switch (provider) {
      case "google":
        return <Icons.google className="mr-2 size-4" />
      case "github":
        return <Icons.gitHub className="mr-2 size-4" />
      case "gitlab":
        return <Icons.gitLab className="mr-2 size-4" />
    }
  }

  if (props.socialTypes.length === 0) return null;
  if (props.socialTypes.length === 1) {
    return (
      <Button variant="outline" size={"lg"} onClick={() => props.onClick(props.socialTypes[0])}>
        {socialIcons(props.socialTypes[0])}
        Continue with {props.socialTypes[0].charAt(0).toUpperCase() + props.socialTypes[0].slice(1)}
      </Button>
    );
  }

  return (
    // <div className="grid grid-cols-2 gap-6">
    //   {props.socialTypes.map((provider) => (
    //     <Button key={provider} variant="outline" onClick={() => props.onClick(provider)}>
    //       {socialIcons(provider)}
    //       {provider.charAt(0).toUpperCase() + provider.slice(1)}
    //     </Button>
    //   ))}
    // </div>

    <div className="grid grid-cols-1 gap-6">
      {props.socialTypes.map((provider) => (
        <Button key={provider} variant="outline" size={"lg"} onClick={() => props.onClick(provider)}>
          {socialIcons(provider)}
          Continue with {provider.charAt(0).toUpperCase() + provider.slice(1)}
        </Button>
      ))}
    </div>

  );
};
