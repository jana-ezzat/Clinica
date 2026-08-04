import AuthTop from "@/modules/reset-pass/components/molecules/AuthTop";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 px-5 py-4 sm:gap-6 sm:px-4 sm:py-6">
      <AuthTop />
      {children}
    </div>
  );
};

export default layout;
