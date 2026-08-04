import React from "react";
import Link from "next/link";

interface FooterLinkProps {
  label: string;
  href: string;
}

export default function FooterLink({ label, href }: FooterLinkProps) {
  return (
    <Link
      href={href}
      className="text-sm opacity-80 transition-opacity hover:opacity-100">
      {label}
    </Link>
  );
}
