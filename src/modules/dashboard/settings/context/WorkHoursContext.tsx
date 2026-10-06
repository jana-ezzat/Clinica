"use client";

import React, { createContext, ReactNode, useContext, useState } from "react";

export interface TimeSlot {
  from: string;
  to: string;
}

interface WorkHoursContextType {
  selectedDays: string[];
  setSelectedDays: React.Dispatch<React.SetStateAction<string[]>>;

  slots: TimeSlot[];
  setSlots: React.Dispatch<React.SetStateAction<TimeSlot[]>>;

  updateSlot: (index: number, key: keyof TimeSlot, value: string) => void;
}

const WorkHoursContext = createContext<WorkHoursContextType | undefined>(
  undefined,
);

export const WorkHoursProvider = ({ children }: { children: ReactNode }) => {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const [slots, setSlots] = useState<TimeSlot[]>([
    {
      from: "09:00",
      to: "21:00",
    },
  ]);

  const updateSlot = (index: number, key: keyof TimeSlot, value: string) => {
    setSlots((prev) =>
      prev.map((slot, i) =>
        i === index
          ? {
              ...slot,
              [key]: value,
            }
          : slot,
      ),
    );
  };

  return (
    <WorkHoursContext.Provider
      value={{
        selectedDays,
        setSelectedDays,
        slots,
        updateSlot,
        setSlots,
      }}
    >
      {children}
    </WorkHoursContext.Provider>
  );
};

export const useWorkHours = () => {
  const context = useContext(WorkHoursContext);

  if (!context) {
    throw new Error("useWorkHours must be used inside WorkHoursProvider");
  }

  return context;
};
