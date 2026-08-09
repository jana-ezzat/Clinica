import Link from "next/link";
import React from "react";

const ForgotPasswordLink = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full justify-end">
      <Link
        href="/forget-pass"
        className="text-sm ds-text-primary dark:text-white transition-all"
      >
        {children}
      </Link>
    </div>
  );
};

export default ForgotPasswordLink;
