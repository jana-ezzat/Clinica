import React from "react";
import FooterLink from "../atoms/FooterLink";
import Title from "@/shared/components/atoms/Title";

interface FooterColumnLink {
  label: string;
  href: string;
}

interface FooterColumnProps {
  heading: string;
  links: FooterColumnLink[];
}

export default function FooterColumn({ heading, links }: FooterColumnProps) {
  return (
    <div className="min-w-[120px]">
      <Title variant="footerText" size="sm" className="mb-3 font-semibold">
        {heading}
      </Title>
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.label}>
            <FooterLink label={link.label} href={link.href} />
          </li>
        ))}
      </ul>
    </div>
  );
}
