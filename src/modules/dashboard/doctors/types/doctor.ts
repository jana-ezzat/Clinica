export type DoctorGender = "male" | "female";

export type DoctorCredential = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
};

export type DoctorReservationStatus = "confirmed" | "pending" | "cancelled";
export type DoctorVisitType = "examination" | "consultation" | "followUp";

export type DoctorReservation = {
  id: string;
  patient: string;
  /** Translation key inside `doctors.profile.reservations.visitTypes` */
  visitTypeKey: DoctorVisitType;
  /** 24h "HH:mm" time, formatted per-locale at render time */
  time: string;
  age: number;
  status: DoctorReservationStatus;
};

export type DoctorProfile = {
  id: string;
  name: string;
  specialty: string;
  avatarUrl: string;
  isOnline: boolean;
  age: number;
  gender: DoctorGender;
  phone: string;
  email: string;
  clinicAddress: string;
  workHours: string;
  yearsOfExperience: number;
  bio: string;
  certificates: DoctorCredential[];
  awards: DoctorCredential[];
  reservations: DoctorReservation[];
  reservationsTotal: number;
};
