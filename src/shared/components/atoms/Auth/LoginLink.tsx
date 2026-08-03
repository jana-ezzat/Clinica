import Link from "next/link";
import React from "react";

const LoginLink = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center items-center w-full mt-2">
      <Link
        href="/sign-in"
        className="text-sm text-[var(--ds-primary-light)] transition-all  "
      >
        {children}
      </Link>
    </div>
  );
};

export default LoginLink;
