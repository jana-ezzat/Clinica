import { redirect } from "next/navigation";
import { doctorProfileMock } from "@/modules/dashboard/doctors/lib/mockData";

export default function DoctorsPage() {
  // TODO: replace with a real doctors list page once the API/table design is ready.
  redirect(`/dashboard/doctors/${doctorProfileMock.id}`);
}
