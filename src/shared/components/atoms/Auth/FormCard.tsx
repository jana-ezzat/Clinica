import React from "react";

const FormCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="ds-bg-card mx-auto w-full rounded-[18px] px-4 pb-6 pt-7 shadow-xl sm:max-w-[691px] sm:px-10 sm:pb-7 sm:pt-9 md:px-14">
      {children}
    </div>
  );
};

export default FormCard;
