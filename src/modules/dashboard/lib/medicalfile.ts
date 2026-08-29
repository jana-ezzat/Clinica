export interface Operation {
  name: string;
  year: string;
}

export interface MedicalFileData {
  chronicDiseases: string[];
  allergies: string[];
  medications: string[];
  operations: Operation[];
  medicalHistory: string;
  familyHistory: string;
}

export const medicalFileData: MedicalFileData = {
  chronicDiseases: ["السكري من النوع الثاني", "إرتفاع ضغط الدم"],

  allergies: ["الفول السوداني", "البنسلين"],

  medications: ["جلوكوفاج 5 مجم مرتين يوميًا", "كونكور 5 مجم مرتين يوميًا"],

  operations: [
    { name: "استئصال المرارة", year: "2018" },
    { name: "عملية عادية", year: "2020" },
  ],

  medicalHistory: "تم تشخيص السكري منذ 5 سنوات. يتابع بانتظام مع طبيب القلب",

  familyHistory: "والده مصاب بالسكري. والدته مصابة بارتفاع ضغط الدم.",
};
