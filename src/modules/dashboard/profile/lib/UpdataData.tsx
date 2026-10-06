export interface CredentialData {
  _id: string;
  title: string;
  desc: string;
  file: string | null;
  publicId: string | null;
}

export type CredentialType = "awards" | "certificates";

export interface CredentialResponse {
  data: {
    certificate?: CredentialData;
    award?: CredentialData;
  };
}

export interface Props {
  type: CredentialType;
  id: string;
}

export interface FormValues {
  title: string;
  desc: string;
}
