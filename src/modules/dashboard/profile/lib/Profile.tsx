// Get Profile

export interface ProfileImage {
  url: string;
  public_id: string;
}
export interface UserProfile {
  _id: string;
  name: string;
  slug: string;
  email: string;
  img: ProfileImage | null;
  role: string;
  removeImage?: boolean;
  certificates: string[];
  awards: string[];
}

// Add Awards
export interface CredentialItem {
  id: number;
  title: string;
  desc: string;
  file: File | null;
}

export interface CredentialResponse {
  _id: string;
  title: string;
  desc: string;
  file: string;
}

export interface Credential {
  _id: string;
  title?: string;
  desc?: string;
  file?: string |null;
}

// Get Awards
export interface CredentialCardProps {
  title: string;
  items: Credential[];
  onEdit?: (item: Credential) => void;
  onDelete?: (item: Credential) => void;
  deletingId?: string | null;
}

export interface AwardsResponse {
  awards: Credential[];
}

export interface CertificatesResponse {
  certificates: Credential[];
}

// Update Profile Image & Name
export interface UpdateData {
  name: string;
  email: string;
  img?: File | null;
  removeImage: boolean;
}

// Delete Award
export interface DeleteAwardResponse {
  status: string;
  message: string;
  data: null;
}

// Update Awards
export interface AddCredentialPayload {
  title: string;
  desc: string;
  file: File | null;
}
