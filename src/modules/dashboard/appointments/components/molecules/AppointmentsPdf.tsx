"use client";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

Font.register({
  family: "Cairo",
  fonts: [
    { src: "/fonts/Cairo-Regular.ttf", fontWeight: "normal" },
    { src: "/fonts/Cairo-Bold.ttf", fontWeight: "bold" },
  ],
});

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
  brand: { fontSize: 20, fontWeight: 700, color: "#0f172a", marginBottom: 5 },
  titleBlock: { alignItems: "flex-start" },
  title: { fontSize: 18, fontWeight: 700, color: "#0f766e", marginBottom: 6 },
  subtitle: { fontSize: 10, color: "#64748b" },
  table: { border: "1px solid #e2e8f0", borderRadius: 8, overflow: "hidden" },
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
  cell: { width: "20%" },
  headerText: { fontSize: 9, fontWeight: 700, color: "#475569" },
  cellText: { fontSize: 9, color: "#334155" },
});

interface AppointmentRow {
  name: string;
  bookingType: string;
  status: string;
  bookingDate: string;
  bookingTime: string;
}

interface Props {
  brand: string;
  title: string;
  generatedOn: string;
  appointments: AppointmentRow[];
  labels: {
    name: string;
    bookingType: string;
    status: string;
    bookingDate: string;
    bookingTime: string;
  };
}

export default function AppointmentsPdf({
  brand,
  title,
  generatedOn,
  appointments,
  labels,
}: Props) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.brand}>{brand}</Text>
          <View style={styles.titleBlock}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{generatedOn}</Text>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.cell, styles.headerText]}>{labels.name}</Text>
            <Text style={[styles.cell, styles.headerText]}>
              {labels.bookingType}
            </Text>
            <Text style={[styles.cell, styles.headerText]}>
              {labels.status}
            </Text>
            <Text style={[styles.cell, styles.headerText]}>
              {labels.bookingDate}
            </Text>
            <Text style={[styles.cell, styles.headerText]}>
              {labels.bookingTime}
            </Text>
          </View>

          {appointments.map((appt, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.cell, styles.cellText]}>{appt.name}</Text>
              <Text style={[styles.cell, styles.cellText]}>
                {appt.bookingType}
              </Text>
              <Text style={[styles.cell, styles.cellText]}>{appt.status}</Text>
              <Text style={[styles.cell, styles.cellText]}>
                {appt.bookingDate}
              </Text>
              <Text style={[styles.cell, styles.cellText]}>
                {appt.bookingTime}
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
