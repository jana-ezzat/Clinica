export type EntityRef = string | { _id: string; name?: string };

export interface PatientVisit {
  _id: string;
  doctor: EntityRef;
  visitDate?: string;
  reason?: string;
}

export function getEntityId(value: EntityRef | undefined): string {
  if (!value) return "";
  return typeof value === "string" ? value : value._id;
}
