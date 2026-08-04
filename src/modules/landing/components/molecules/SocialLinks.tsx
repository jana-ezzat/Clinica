import React from "react";
import SocialIcon, { SocialPlatform } from "../atoms/SocialIcon";

const SOCIALS: { platform: SocialPlatform; href: string }[] = [
  { platform: "facebook", href: "#" },
  { platform: "linkedin", href: "#" },
  { platform: "whatsapp", href: "#" },
];

export default function SocialLinks() {
  return (
    <div className="flex items-center gap-3">
      {SOCIALS.map((social) => (
        <SocialIcon
          key={social.platform}
          platform={social.platform}
          href={social.href}
        />
      ))}
    </div>
  );
}
