export interface EditableCredential {
  _id: string;
  title?: string;
  desc?: string;
  file?: string;
  removeFile?: boolean;
}

export interface EditCredentialValues {
  title: string;
  desc: string;
  file: File | null;
  removeFile: boolean;
}

export interface PropsEdit {
  item: EditableCredential;
  heading: string;
  titleLabel: string;
  descLabel: string;
  isSaving?: boolean;
  error?: string;
  onClose: () => void;
  onSubmit: (values: EditCredentialValues) => void;
}

export type EditingState = {
  type: "award" | "certificate";
  item: EditableCredential;
} | null;

export interface CredentialData {
  _id: string;
  title: string;
  desc: string;
  file?: string;
}

export interface EditCredentialResponse {
  awards?: CredentialData;
  Certificate?: CredentialData;
}
