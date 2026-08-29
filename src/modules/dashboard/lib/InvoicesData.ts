export interface InvoiceHeaderData {
  invoiceNumber: string;
  doctorName: string;
  taxNumber: string;
  address: string;
  phone: string;
  email: string;
}

export interface VisitData {
  patient: {
    name: string;
    fileNumber: string;
    phone: string;
    visitDate: string;
  };
  doctor: {
    name: string;
  };
}

export interface Service {
  key: string;
  description: string;
  price: string;
  discount: string;
  total: string;
}

export interface InvoiceClinic {
  brand: string;
  doctorName: string;
  taxNumber: string;
  address: string;
  phone: string;
  email: string;
}

export interface InvoicePatient {
  name: string;
  fileNumber: string;
  phone: string;
  visitDate: string;
  doctorName: string;
}

export interface InvoiceSummary {
  total: string;
  discount: string;
  netTotal: string;
  paid: string;
  paymentMethod: string;
}

export interface InvoicePaymentDetails {
  method: string;
  status: string;
  date: string;
}

export interface InvoiceData {
  invoiceNumber: string;
  clinic: InvoiceClinic;
  date: string;
  time: string;
  patient: InvoicePatient;
  services: Service[];
  summary: InvoiceSummary;
  paymentDetails: InvoicePaymentDetails;
  notes: string;
  terms: string;
}

export const invoiceHeaderData: InvoiceHeaderData = {
  invoiceNumber: "INV-2024-1247",
  doctorName: "عيادة الدكتور احمد",
  taxNumber: "415421646845121412",
  address: "محافظة الجيزة، 6 أكتوبر، الحي الثالث، المجاورة 8",
  phone: "+201061230245",
  email: "info@clinica.com",
};

export const visitData: VisitData = {
  patient: {
    name: "أحمد محمد علي سالم",
    fileNumber: "0251",
    phone: "010359745212",
    visitDate: "24/11/2024",
  },

  doctor: {
    name: "د. أحمد محمد",
  },
};

export const servicesData = [
  {
    key: "checkup",
    description: "كشف طبي",
    price: "525 جنيه",
    discount: "10%",
    total: "472.5 جنيه",
  },
  {
    key: "examination",
    description: "فحص طبي",
    price: "600 جنيه",
    discount: "10%",
    total: "450 جنيه",
  },
  {
    key: "consultation",
    description: "استشارة",
    price: "150 جنيه",
    discount: "10%",
    total: "135 جنيه",
  },
];

export const invoiceData: InvoiceData = {
  invoiceNumber: "INV-2024-1247",

  clinic: {
    brand: "Clinica",
    doctorName: "د. أحمد محمد",
    taxNumber: "415421646845121412",
    address: "القاهرة، مصر",
    phone: "01012345678",
    email: "info@clinica.com",
  },

  date: "2024-11-10",
  time: "10:30 AM",

  patient: {
    name: "محمد أحمد",
    fileNumber: "P-00124",
    phone: "01098765432",
    visitDate: "2024-11-10",
    doctorName: "د. أحمد محمد",
  },

  services: [
    {
      key: "checkup",
      description: "كشف طبي",
      price: "525 جنيه",
      discount: "10%",
      total: "472.5 جنيه",
    },
    {
      key: "examination",
      description: "فحص طبي",
      price: "600 جنيه",
      discount: "10%",
      total: "450 جنيه",
    },
    {
      key: "consultation",
      description: "استشارة",
      price: "150 جنيه",
      discount: "10%",
      total: "135 جنيه",
    },
  ],
  summary: {
    total: "1350 جنيه",
    discount: "150 جنيه",
    netTotal: "1300 جنيه",
    paid: "1300 جنيه",
    paymentMethod: "نقدًا",
  },

  paymentDetails: {
    method: "نقدًا",
    status: "مدفوع",
    date: "2024-11-10",
  },

  notes: "يُنصح بالالتزام بتعليمات الطبيب وتناول الأدوية في مواعيدها.",

  terms: "هذه الفاتورة صادرة من العيادة وتوضح تفاصيل الخدمات الطبية المقدمة.",
};
