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
