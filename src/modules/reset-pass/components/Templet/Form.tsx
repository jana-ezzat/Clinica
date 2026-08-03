import React from "react";
import AuthTop from "../molecules/AuthTop";

const Form = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 px-5 py-4 sm:gap-6 sm:px-4 sm:py-6">
      <AuthTop />
      {children}
    </div>
  );
};

export default Form;
