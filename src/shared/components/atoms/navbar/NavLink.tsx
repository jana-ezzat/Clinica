import Link from "next/link";
import type { ReactNode } from "react";

export default function NavLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-sm font-medium ds-text-secondary hover:ds-text transition-opacity">
      {children}
    </Link>
  );
}
