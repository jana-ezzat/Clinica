export interface TimeSlot {
  start: string;
  end: string;
}
interface logo {
  url: string | null;
  public_id: string;
}

export interface ClinicSettingsForm {
  clinicName: string;
  phone: string;
  email: string;
  logo: logo;
  address: string;
  workingDays: string[];
  workingHours: TimeSlot;
  paymentMethods: string[];
  taxRate: number;
  appointmentDuration: number;
  maxAdvanceBookingDays: number;
  minAdvanceBookingHours: number;
}

export interface ClinicSettingsResponse {
  status: string;
  data: {
    _id: string;
    clinicName: string;
    phone: string;
    email: string;
    address: string;
    logo: logo;
    workingDays: string[];
    workingHours: {
      start: string;
      end: string;
    };
    paymentMethods: string[];
    taxRate: number;
    appointmentDuration: number;
    maxAdvanceBookingDays: number;
    minAdvanceBookingHours: number;
  };
}

export const DAYS = [
  "saturday",
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
];

export const paymentMethods = ["cash", "card", "bank_transfer"];
