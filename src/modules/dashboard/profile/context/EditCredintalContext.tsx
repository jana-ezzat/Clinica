"use client";

import { createContext, Dispatch, SetStateAction, useContext } from "react";

import { EditCredentialValues, EditingState } from "../lib/EditModal";
import { useEditCredential } from "../hooks/Queries/useEditCredential";

interface Value {
  editing: EditingState;

  setEditing: Dispatch<SetStateAction<EditingState>>;

  isEdit: boolean;

  handleEdit: () => void;

  preview: string | null;

  selectedFile: File | null;

  removedImage: boolean;

  handlePickImage: (e: React.ChangeEvent<HTMLInputElement>) => void;

  handleRemoveImage: () => void;

  handleCancel: () => void;

  handleSave: (
    type: "award" | "certificate",
    id: string,
    values: EditCredentialValues,
  ) => Promise<void>;

  isSaving: boolean;

  error: Error | null;
}

const EditCredentialContext = createContext<Value | null>(null);

export function EditCredentialProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const editCredential = useEditCredential();

  return (
    <EditCredentialContext.Provider value={editCredential}>
      {children}
    </EditCredentialContext.Provider>
  );
}

export const useEditCredentialContext = () => {
  const context = useContext(EditCredentialContext);

  if (!context) {
    throw new Error("حدث خطأ ما حاول مرة اخرى");
  }

  return context;
};
