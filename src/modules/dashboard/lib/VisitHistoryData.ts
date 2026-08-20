export interface VisitHistoryData {
  visitNumber: string;
  doctor: string;
  date: string;
  reason: string;
  vitals: {
    weight: string;
    pressure: string;
    pulse: string;
    temperature: string;
  };

  examination: string;
  diagnosis: string;
  prescription: string;
  followUp: string;
  doctorNotes: string;
}

export const visitHistoryData: VisitHistoryData = {
  visitNumber: "V-001",
  doctor: "د. أحمد محمد",
  date: "2024-11-10",
  reason: "ألم في المعدة",

  vitals: {
    weight: "82 كجم",
    pressure: "130/85",
    pulse: "78",
    temperature: "36.8°",
  },

  examination: "فحص البطن أظهر ألم خفيف في المنطقة العلوية اليمنى",
  diagnosis: "التهاب المعدة الحاد",
  prescription: "أوميبرازول 20 مجم مرتين يوميًا لمدة أسبوعين",
  followUp: "المتابعة بعد أسبوعين",
  doctorNotes: "يُنصح بتجنب الأطعمة الحارة والمقلية",
};
