import type { DoctorProfile } from "../types/doctor";

export const doctorProfileMock: DoctorProfile = {
  id: "1",
  name: "د/أحمد محمد",
  specialty: "أخصائي أمراض الباطنة",
  avatarUrl: "https://i.pravatar.cc/150?img=13",
  isOnline: true,
  age: 35,
  gender: "male",
  phone: "+1 (555) 123-4567",
  email: "ahmed.mohamed@healthhub.com",
  clinicAddress: "123 الشارع الرئيسي، القاهرة، مصر",
  workHours: "من الإثنين إلى الجمعة: 9 صباحا - 5 مساء",
  yearsOfExperience: 10,
  bio: "الدكتور أحمد محمد هو طبيب باطني ذو خبرة عالية ولديه شغف بتقديم رعاية استثنائية للمرضى، وهو متخصص في تشخيص وعلاج مجموعة واسعة من حالات الطب الباطني، مع التركيز على الرعاية الوقائية وإدارة الأمراض المزمنة.",
  certificates: [
    {
      id: "cert-1",
      title: "شهادة البورد في الطب الباطني",
      subtitle: "البورد الأمريكي للطب الباطني",
      image:
        "https://images.unsplash.com/photo-1606166187734-a4cb74079037?w=600&q=80",
    },
  ],
  awards: [
    {
      id: "award-1",
      title: "جائزة أفضل طبيب",
      subtitle: "نقابة القاهرة الطبية",
      image:
        "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=600&q=80",
    },
  ],
  reservations: [
    {
      id: "1",
      patient: "هدى علي",
      visitTypeKey: "examination",
      time: "10:00",
      age: 28,
      status: "confirmed",
    },
    {
      id: "2",
      patient: "ليلي أحمد",
      visitTypeKey: "consultation",
      time: "11:30",
      age: 34,
      status: "pending",
    },
    {
      id: "3",
      patient: "سامر أحمد",
      visitTypeKey: "followUp",
      time: "14:00",
      age: 45,
      status: "cancelled",
    },
  ],
  reservationsTotal: 1423,
};

/** Placeholder "API" until a real doctors endpoint exists. */
export async function getDoctorProfile(
  id: string,
): Promise<DoctorProfile | null> {
  if (id !== doctorProfileMock.id) return null;
  return doctorProfileMock;
}
