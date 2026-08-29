"use client";

import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 35,
    fontSize: 10,
    color: "#1e293b",
    backgroundColor: "#ffffff",
    direction: "rtl",
    fontFamily: "Cairo",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingBottom: 18,
    marginBottom: 18,
    borderBottom: "1px solid #e2e8f0",
  },

  clinicInfo: {
    flexDirection: "column",
    gap: 5,
  },

  brand: {
    fontSize: 20,
    fontWeight: 700,
    color: "#0f172a",
    marginBottom: 5,
  },

  doctor: {
    fontSize: 11,
    color: "#475569",
  },

  invoiceInfo: {
    alignItems: "flex-start",
  },

  invoiceTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: "#0f766e",
    marginBottom: 6,
  },

  invoiceNumber: {
    fontSize: 10,
    color: "#64748b",
  },

  // General
  section: {
    marginBottom: 18,
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: "#0f172a",
    marginBottom: 10,
  },

  // Cards
  card: {
    border: "1px solid #e2e8f0",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },

  // Info rows
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 7,
  },

  label: {
    color: "#64748b",
    fontSize: 9,
  },

  value: {
    color: "#1e293b",
    fontSize: 10,
    fontWeight: 700,
  },

  // Date section
  dateGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  dateItem: {
    flexDirection: "column",
    gap: 4,
    width: "30%",
  },

  // Patient
  patientGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },

  patientItem: {
    width: "30%",
    marginBottom: 10,
  },

  // Table
  table: {
    border: "1px solid #e2e8f0",
    borderRadius: 8,
    overflow: "hidden",
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f1f5f9",
    paddingVertical: 9,
    paddingHorizontal: 8,
  },

  tableRow: {
    flexDirection: "row",
    paddingVertical: 9,
    paddingHorizontal: 8,
    borderTop: "1px solid #e2e8f0",
  },

  descriptionCell: {
    width: "40%",
  },

  smallCell: {
    width: "20%",
  },

  headerText: {
    fontSize: 9,
    fontWeight: 700,
    color: "#475569",
  },

  cellText: {
    fontSize: 9,
    color: "#334155",
  },

  // Payment
  paymentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 18,
  },

  paymentBox: {
    width: "48%",
    border: "1px solid #e2e8f0",
    borderRadius: 8,
    padding: 12,
  },

  paymentTitle: {
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 12,
    color: "#0f172a",
  },

  divider: {
    borderBottom: "1px solid #2dd4bf",
    marginVertical: 8,
  },

  green: {
    color: "#16a34a",
    fontWeight: 700,
  },

  // Notes
  noteBox: {
    backgroundColor: "#f8fafc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },

  noteTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: "#334155",
    marginBottom: 6,
  },

  noteText: {
    fontSize: 9,
    color: "#64748b",
    lineHeight: 1.5,
  },

  // Footer
  footer: {
    marginTop: 15,
    paddingTop: 10,
    borderTop: "1px solid #e2e8f0",
    textAlign: "center",
  },

  footerText: {
    fontSize: 8,
    color: "#94a3b8",
  },
});

interface Service {
  description: string;
  price: string;
  discount: string;
  total: string;
}

interface Props {
  invoice: {
    invoiceNumber: string;

    clinic: {
      brand: string;
      doctorName: string;
      taxNumber: string;
      address: string;
      phone: string;
      email: string;
    };

    date: string;
    time: string;

    patient: {
      name: string;
      fileNumber: string;
      phone: string;
      visitDate: string;
      doctorName: string;
    };

    services: Service[];

    summary: {
      total: string;
      discount: string;
      netTotal: string;
      paid: string;
      paymentMethod: string;
    };

    paymentDetails: {
      method: string;
      status: string;
      date: string;
    };

    notes: string;
    terms: string;
  };

  labels: {
    invoice: string;
    taxNumber: string;
    address: string;
    phone: string;
    email: string;
    date: string;
    time: string;

    patient: string;
    fileNumber: string;
    visitDate: string;
    doctor: string;

    services: string;
    description: string;
    price: string;
    discount: string;
    total: string;

    paymentSummary: string;
    netTotal: string;
    paid: string;
    paymentMethod: string;

    paymentDetails: string;
    status: string;

    notes: string;
    terms: string;
  };
}

export default function InvoicePdf({ invoice, labels }: Props) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.clinicInfo}>
            <Text style={styles.brand}>{invoice.clinic.brand}</Text>

            <Text style={styles.doctor}>{invoice.clinic.doctorName}</Text>

            <Text style={styles.label}>{invoice.clinic.address}</Text>

            <Text style={styles.label}>{invoice.clinic.phone}</Text>

            <Text style={styles.label}>{invoice.clinic.email}</Text>
          </View>

          <View style={styles.invoiceInfo}>
            <Text style={styles.invoiceTitle}>{labels.invoice}</Text>

            <Text style={styles.invoiceNumber}>{invoice.invoiceNumber}</Text>

            <Text style={styles.invoiceNumber}>{invoice.date}</Text>
          </View>
        </View>

        {/* ================= TAX ================= */}

        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>{labels.taxNumber}</Text>

            <Text style={styles.value}>{invoice.clinic.taxNumber}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>{labels.invoice}</Text>

          <View style={styles.dateGrid}>
            <View style={styles.dateItem}>
              <Text style={styles.label}>{labels.invoice}</Text>

              <Text style={styles.value}>{invoice.invoiceNumber}</Text>
            </View>

            <View style={styles.dateItem}>
              <Text style={styles.label}>{labels.date}</Text>

              <Text style={styles.value}>{invoice.date}</Text>
            </View>

            <View style={styles.dateItem}>
              <Text style={styles.label}>{labels.time}</Text>

              <Text style={styles.value}>{invoice.time}</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>{labels.patient}</Text>

          <View style={styles.patientGrid}>
            <View style={styles.patientItem}>
              <Text style={styles.label}>{labels.patient}</Text>

              <Text style={styles.value}>{invoice.patient.name}</Text>
            </View>

            <View style={styles.patientItem}>
              <Text style={styles.label}>{labels.fileNumber}</Text>

              <Text style={styles.value}>{invoice.patient.fileNumber}</Text>
            </View>

            <View style={styles.patientItem}>
              <Text style={styles.label}>{labels.phone}</Text>

              <Text style={styles.value}>{invoice.patient.phone}</Text>
            </View>

            <View style={styles.patientItem}>
              <Text style={styles.label}>{labels.visitDate}</Text>

              <Text style={styles.value}>{invoice.patient.visitDate}</Text>
            </View>

            <View style={styles.patientItem}>
              <Text style={styles.label}>{labels.doctor}</Text>

              <Text style={styles.value}>{invoice.patient.doctorName}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{labels.services}</Text>

          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.descriptionCell, styles.headerText]}>
                {labels.description}
              </Text>

              <Text style={[styles.smallCell, styles.headerText]}>
                {labels.price}
              </Text>

              <Text style={[styles.smallCell, styles.headerText]}>
                {labels.discount}
              </Text>

              <Text style={[styles.smallCell, styles.headerText]}>
                {labels.total}
              </Text>
            </View>

            {invoice.services.map((service, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={[styles.descriptionCell, styles.cellText]}>
                  {service.description}
                </Text>

                <Text style={[styles.smallCell, styles.cellText]}>
                  {service.price}
                </Text>

                <Text style={[styles.smallCell, styles.cellText]}>
                  {service.discount}
                </Text>

                <Text style={[styles.smallCell, styles.cellText]}>
                  {service.total}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.paymentContainer}>
          {/* Summary */}

          <View style={styles.paymentBox}>
            <Text style={styles.paymentTitle}>{labels.paymentSummary}</Text>

            <View style={styles.row}>
              <Text style={styles.label}>{labels.total}</Text>

              <Text style={styles.value}>{invoice.summary.total}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>{labels.discount}</Text>

              <Text style={styles.value}>{invoice.summary.discount}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.row}>
              <Text style={styles.label}>{labels.netTotal}</Text>

              <Text style={styles.value}>{invoice.summary.netTotal}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>{labels.paid}</Text>

              <Text style={styles.green}>{invoice.summary.paid}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>{labels.paymentMethod}</Text>

              <Text style={styles.value}>{invoice.summary.paymentMethod}</Text>
            </View>
          </View>

          {/* Details */}

          <View style={styles.paymentBox}>
            <Text style={styles.paymentTitle}>{labels.paymentDetails}</Text>

            <View style={styles.row}>
              <Text style={styles.label}>{labels.paymentMethod}</Text>

              <Text style={styles.value}>{invoice.paymentDetails.method}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>{labels.status}</Text>

              <Text style={styles.green}>{invoice.paymentDetails.status}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>{labels.date}</Text>

              <Text style={styles.value}>{invoice.paymentDetails.date}</Text>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <View style={styles.noteBox}>
            <Text style={styles.noteTitle}>{labels.notes}</Text>

            <Text style={styles.noteText}>{invoice.notes}</Text>
          </View>

          <View style={styles.noteBox}>
            <Text style={styles.noteTitle}>{labels.terms}</Text>

            <Text style={styles.noteText}>{invoice.terms}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>{invoice.clinic.brand}</Text>
        </View>
      </Page>
    </Document>
  );
}
