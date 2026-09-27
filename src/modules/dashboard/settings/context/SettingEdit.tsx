"use client";
import React, { createContext, useContext, useState } from "react";

interface SettingsEditContextType {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

const SettingsEditContext = createContext<SettingsEditContextType | undefined>(
  undefined,
);

export const SettingsEditProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <SettingsEditContext.Provider value={{ isEditing, setIsEditing }}>
      {children}
    </SettingsEditContext.Provider>
  );
};

export const useSettingsEdit = () => {
  const context = useContext(SettingsEditContext);
  if (!context) {
    throw new Error(
      "useSettingsEdit must be used inside SettingsEditProvider",
    );
  }
  return context
};
