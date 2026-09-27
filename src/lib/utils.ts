export { cn } from "@/lib/cn";

export const getLocalDateString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

interface DecodedToken {
  id: string;
  name: string;
  role: string;
  [key: string]: unknown;
}

export const decodeToken = (token: string): DecodedToken | null => {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch {
    return null;
  }
};

export const ageToDateOfBirth = (age: number): string => {
  const year = new Date().getFullYear() - age;
  return `${year}-01-01`;
};